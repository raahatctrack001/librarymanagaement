import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyUser = asyncHandler(async (req, res, next)=>{
    try {
        
        const { accessToken } = req.cookies;
        
        if(!accessToken){
            throw new apiError(401, 'Unauthorized acess!, Authenticate yourself to proceed!')
        }
        
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            throw new apiError(401, 'Internal Server Error: Failed to decode token')
        }

        const currentUser = await User.findById(decodedToken?._id).select("-password -refreshToken -phone -rollNumber");
        req.user = currentUser;
        next();
    } catch (error) {
        next(error)
    }
})

export const verifyAdmin = asyncHandler((req, res, next)=>{
    
})