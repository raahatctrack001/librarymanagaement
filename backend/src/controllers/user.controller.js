import User from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"

export const updateProfilePicture = asyncHandler(async (req, res, next)=>{

})

export const updateAccountDetails = asyncHandler(async (req, res, next)=>{

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