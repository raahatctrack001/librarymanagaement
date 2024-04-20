import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import bcryptjs from 'bcryptjs'


const generateAccessAndRefreshToken = async (userId)=>{
    try {
        const currentUser = await User.findById(userId);
        

        const accessToken = await currentUser.generateAccessToken();
        const refreshToken =  await currentUser.generateRefreshToken();
    
        currentUser.refreshToken = refreshToken;
        currentUser
            .save()
            .then(()=>{
                console.log('tokens generated successfully!')
            })
            .catch((error)=>{
                throw new apiError(500, error.message)
            })
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiError(500, error.message)
    }
}//wrapping above code inside async handler gives undefined on destructuring


/******************** httpOnly: ***************
true: This option makes the cookie HTTP-only. This means that the cookie cannot be accessed or 
modified by client-side JavaScript. It is a security measure to prevent cross-site scripting (XSS) attacks, 
as the cookie is not exposed to the client-side scripts.*/

/********************************* secure: ******************************
false: This option determines whether the cookie should only be transmitted over secure HTTPS connections.
When secure is set to true, the cookie is sent only over HTTPS connections. When secure is set to false, the 
cookie can be sent over both HTTP and HTTPS connections. Setting secure to true helps protect the cookie's 
data by ensuring it is only sent over secure channels. */

const options = {
    httpOnly: true,
    secure: false
}

export const registerUser = asyncHandler(async (req, res, next)=>{
    const {fullName, username, email, phone, rollNumber, yearOfJoining, branch, password, confirmPassword} = req.body;
    if(
        [
            fullName, 
            username, 
            email, 
            phone, 
            rollNumber, 
            yearOfJoining, 
            branch, 
            password, 
            confirmPassword
        ].some(field=>field?.trim()?0:1)
    ){
        throw new apiError(400, "All field's are mendatory!");
    }

    if(username.length < 6 || username.length > 25){
        throw new apiError(411, 'username should lie between 6 to 25 character')
    }

    const userPattern = /^[a-zA-Z0-9._%+-]+@dseu\.ac\.in$/
    const dseuEmailPattern = /^[a-zA-Z0-9._%+-]+@dseu\.ac\.in$/;   
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/
    
    if(userPattern.test(username)){
        throw new apiError(406, "username can't end with @dseu.a")
    }


    if(!dseuEmailPattern.test(email)){
        throw new apiError(406, "Email pattern doesn't belongs to DSEU Organization")
    }

    if(phone.length != 10){
        throw new apiError(406, "Invalid Phone! enter valid mobile number without country code!" )
    }

    if(rollNumber.length != 8){
        throw new apiError(406, "invalid roll number!")
    }

    if(password != confirmPassword){
        throw new apiError(406, "password doesn't match!")
    }

    if(!passwordPattern.test(password)){
        throw new apiError(406, "Invalid Password!, password must be 8 character and should contain at least one uppercase, lowercase, digit and a special character")
    }
    try {           
        const checkIfExists = await User.findOne({
            $or: [{email}, {username}, {rollNumber}, {phone}]
        });   
        
        if(checkIfExists?._id){
            throw new apiError(409, "user with this credentials already exists!")
        }
        
        const newUser = await User.create({
            fullName, 
            username, 
            email, 
            phone, 
            rollNumber, 
            yearOfJoining, 
            branch, 
            password,
        })
        
        if(!newUser){
            throw new apiError(500, "Failed to save user registration data due to internal server error!")
        }
        
        const createdUser = await User.findById(newUser?._id).select("-password -refreshToken")
        console.log(createdUser)
        
        return res
            .status(200)
            .json(
                new apiResponse(200, "User Registration Success!", createdUser)
            )
    } 
    catch (error) {
        next(error);
    }
});

export const logInUser = asyncHandler(async (req, res, next)=>{
    const { erpu,  password } = req.body
    if(!erpu?.trim()){
        throw new apiError(406, "Please enter email or rollNumber or phone or username")
    }
    let query = {};

    const dseuEmailPattern = /^[a-zA-Z0-9._%+-]+@dseu\.ac\.in$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/

    if(dseuEmailPattern.test(erpu)){
        query = {
            email: erpu,
        }
    }
    
    if(!isNaN(erpu) && erpu.length == 10){
        query = {
            phone: erpu,
        }
    }
    
    if(!isNaN(erpu) && erpu.length == 8){
        query = {
            rollNumber: erpu,
        }
    }

    if(Object.keys(query).length == 0){
        query = {
            username: erpu
        }
    }
    
    if(!passwordPattern.test(password)){
        throw new apiError(406, "invalid password")
    }
    try {        
        const getUser = await User.findOne(query);
        if(!getUser){
            throw new apiError(404, "User with this credentials doesn't Exist!")
        }   
        
        const isPasswordCorrect = await getUser.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            throw new apiError(401, "Wrong Credentials!")
        }

        const currentUser = await User.findById(getUser?._id).select('-password -refreshToken');
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(getUser?._id)
    
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new apiResponse(200, 'User logged In Success!', currentUser)
            );
    } catch (error) {
        next(error)
    }
})

export const logOutUser = asyncHandler(async (req, res, next)=>{
   try {
        const currentUser = await User.findByIdAndUpdate(req.user?._id,
            {
                $set:{
                    refreshToken:1
                },
            },
            {
                new: true,
            }
        );
        if(!currentUser){
            throw new apiError(401, "Unauthorized access!")
        }        
        return res
            .status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json(
                new apiResponse(200, "user Logged Out!", {})
            );

   } catch (error) {
        next(error);
   }
})

export const deleteUserByAdmin = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "Unauthorised!, You are not an admin.")
    }

    try {
        await User.findByIdAndDelete(req.params?.userId);        
        return res  
                .status(200)
                .json(
                    new apiResponse(200, "user deleted!")
                )
    } catch (error) {
        next(error)
    }
})

export const resetPassword = asyncHandler(async (req, res, next)=>{
    // console.log(req.user);        
    // throw new apiError(500, "intentional termination for unit testing");

    const { email, phone, rollNumber, newPassword, confirmPassword } = req.body;
    if(
        [email, phone, rollNumber, newPassword, confirmPassword].some(field=>field?.trim()?0:1)
    ){
        throw new apiError(406, "All fields are necessary!");
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/    
    if(newPassword != confirmPassword){
        throw new apiError(406, "password doesn't match!");
    }

    if(!passwordPattern.test(newPassword)){
        throw new apiError(406, "Invalid Password!, password must be 8 character and should contain at least one uppercase, lowercase, digit and a special character")
    }

    const currentUser = await User.findById(req.user?._id);
    if(!currentUser){
        throw new apiError(404, "user with this credentials doesn't exist!");
    }

    if(email != currentUser?.email && phone != currentUser?.phone && rollNumber != currentUser?.rollNumber){
        throw new apiError(401, "You are not an authorised person to reset password, as credentials doesn't match with our database")
    }
   try {
    
    currentUser.password = newPassword;
    currentUser
        .save()
        .catch((error)=>next(error));
        
    return res  
            .status(200)
            .json(
                new apiResponse(200, "password reset successful!")
            )
   }catch (error) {
        next(error)
   }
})

export const updatePassword = asyncHandler(async (req, res, next)=>{
    const { oldPassword, newPassword, confirmPassword } = req.body
    
    if(newPassword != confirmPassword){
        throw new apiError(406, "password doesn't match!")
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/
    if(!passwordPattern.test(newPassword)){
        throw new apiError(406, "Invalid Password!, password must be 8 character and should contain at least one uppercase, lowercase, digit and a special character")
    }

    try {
        const currentUser = await User.findById(req.user?._id);
        
        if(!currentUser.isPasswordCorrect(oldPassword)){
            throw new apiError(401, "You are not allowed to update password, as provided credentials is invalid")
        }
        
        currentUser.password = newPassword;
        currentUser 
            .save()
            .then((savedUser)=>{
                console.log(savedUser)
            })
            .catch(error=>next(error))
        return res
                .status(200)
                .json(
                    new apiResponse(200, "Password updated!")
                )
    } catch (error) {
        next(error)
    }
})

export const continueWithGoogle = asyncHandler(async (req, res, next)=>{
    console.log(req.body)
    throw Error
    const {name, email, googlePhotoURL} = req.body;
    try {
        const isUserExist = await User.findOne({email})?.select("-password -refreshToken");
        console.log('alreadyexists', isUserExist)
        if(isUserExist){
            const {accessToken, refreshToken} = await generateAccessAndRefreshToken(isUserExist?._id);
            
            if(!accessToken || !refreshToken){
                throw new apiError(400, "Failed to created tokens!");
            }

            return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new apiResponse(200, "Login Successful!", isUserExist)
                );     
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const generatedUsername = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
            
            const newUser = await User.create({
                username: generatedUsername,
                password: hashedPassword,
                photoURL: googlePhotoURL,
                email,
            })?.select("-password");

            if(!newUser){
                throw new apiError(400, "failed to save data in database!")
            }
            const {accessToken, refreshToken} = await generateAccessAndRefreshToken(newUser?._id);
            const savedUser = await User.find(newUser?._id).select("-password -refreshToken");
            console.log('newUser: ', savedUser);
            return res
                .status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json(
                    new apiResponse(200, 'user created!', savedUser)
                )
        }
    }catch (error) {
        next(error);
    }
})