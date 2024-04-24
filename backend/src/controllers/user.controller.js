import User from "../models/user.model.js"
import { uploadOnCloudinary } from "../services/cloudinary.services.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

export const updateProfilePicture = asyncHandler( async (req, res, next)=>{
    const userImageLocalFilePath = req.file.path;
    if(!userImageLocalFilePath){
        throw new apiError(400, 'plz select image to upload');
    }

    try{       
        const response = await uploadOnCloudinary(userImageLocalFilePath);
        if(!response){
            throw new apiError(500, "failed to update book image");
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params?.userId,
            {
                $set: {
                    profilePhoto: response.url,
                }
            }, 
            {
                new: true,
            }
        )

        if(!updatedUser){
            throw new apiError(500, "Failed to update profile image")
        }
        
        console.log(updatedUser)
        return res
            .status(200)
            .json(
                new apiResponse(200, "profile image updated", updatedUser)
            )
        
    }
    catch(error){
        next(error);
    }
})

export const updateAccountDetails = asyncHandler(async (req, res, next)=>{
    // console.log(req.body)
    if(!req.user){
        throw new apiError(401, "you are not allowed to update changes!")
    }
    try {
        const formData = req.body;
        
        const existingUser = await User.findById(req.user?._id);
        let changes = {};

        for(const key in formData){
            if(formData[key] !== existingUser[key]){
                changes[key] = formData[key];
            }
        }

        if(Object.keys(changes).length == 0){
            throw new apiError(204, "plz make some changes then request for update!")
        }

        // console.log(req.params)

        const updatedUser = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: changes // $set: changes not $set: { changes } $set: object not object inside object!
            },
            {
                new: true,
            }
        )
        if(!updatedUser){
            throw new apiError(500, "failed to update user!")
        }

        return res  
                .status(200)
                .json(
                    new apiResponse(200, "user updated", updatedUser)
                )        
    }
    catch(error){
        next(error);
    }      
})

export const getAllUsers = asyncHandler(async (req, res, next)=>{
    console.log("api is being hit!")
    const allUsers = await User.find({});
    if(allUsers?.length === 0){
        throw new apiError(404, "No User Found")
    }

    return res
            .status(200)
            .json(
                new apiResponse(200, "All Users fetched", allUsers)
            )
})

export const getSpecificUser = asyncHandler(async (req, res, next)=>{
    const desiredUser = await User.findById(req.user?._id);
    if(!desiredUser){
        throw new apiError(404, "user not found");
    }

    return res      
            .status(200)
            .json(
                new apiResponse(200, "user found!", desiredUser)
            )
})

export const deleteUser = asyncHandler(async (req, res, next)=>{

})
export const searchUser = asyncHandler(async(req, res, next)=>{
    const { searchTerm } = req.params;
    try {        
        const foundUsers = await User.find({
            $or: [
                { fullName: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in ISBN field
                { phone: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in author field
                { rollNumber: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in title field
                { email: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in topic field
                { branch: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search in branch field
            ]
        });
    
        if(foundUsers.length == 0){
            return res  
                    .status(200)
                    .json(
                        new apiResponse(200, "No Match Found!")
                    )
        }
    
        return res  
                .status(200)
                .json(
                    new apiResponse(200, `${foundUsers.length} books with these keyword found!`, foundUsers)
                );
    } catch (error) {
        next(error)
    }
})