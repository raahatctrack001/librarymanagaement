import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";


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
});

export const logInUser = asyncHandler(async (req, res, next)=>{
    const { erpu,  password } = req.body
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
        
        const currentUser = await User.findById(getUser?._id).select('-password -refreshToken');
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(getUser?._id)
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
    
        return res
            .status(200)
            .cookie('acessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(
                new apiResponse(200, 'User logged In Success!', currentUser)
            );
    } catch (error) {
        next(error)
    }
})

export const logOutUser = asyncHandler(async (req, res, next)=>{
    
})

export const deleteUserByAdmin = asyncHandler(async (req, res, next)=>{

})

export const resetPassword = asyncHandler(async (req, res, next)=>{
    
})

export const updatePassword = asyncHandler(async (req, res, next)=>{
    
})

export const continueWithGoogle = asyncHandler(async (req, res, next)=>{
    
})

