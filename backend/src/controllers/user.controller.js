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