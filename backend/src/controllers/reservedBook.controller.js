import { stringify } from "querystring"
import Book from "../models/book.model.js"
import User from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import apiResponse from "../utils/apiResponse.js"

export const reserveBook = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian, are you? Contact librarian to get u this book!")
    }
    try {    
        const bookToReserve = await Book.findById(req.params?.bookId);
        // console.log(bookToReserve)
        if(!bookToReserve){
            throw new apiError(404, "Book not found!");
        }

        const availableCopies = bookToReserve.availableCopies;
        const newCopies = parseInt(availableCopies)-1;
        if(newCopies < 0){
            throw new apiError(409, "Copies Unavailable! Try coming after some days")
        }
    
        const { erpu } = req.body
        if(!erpu?.trim()){
            throw new apiError(406, "Please enter email or rollNumber or phone or username")
        }
        let query = {};
    
        const dseuEmailPattern = /^[a-zA-Z0-9._%+-]+@dseu\.ac\.in$/;
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
    
        const reserveFor = await User.findOne(query); //find gives promises and findOne gives object hence tapping with .operator into promises isn't a good choice if you dont' wan to end up your days finding bugs!
        if(!reserveFor){
            throw new apiError(404, "user not found!");
        }
        
        const alreadyAHolder = reserveFor.bookBank.indexOf(bookToReserve?._id);
        if(alreadyAHolder != -1){
            throw new apiError(409, "You already have on copy of this book!, one student can have at most one copy of book.")
        }
    
        const updatedUser = await User.findByIdAndUpdate(
            reserveFor?._id,
            {
                $push:{
                    bookBank: bookToReserve?._id,
                }
            }, {
                new: true,
            }
        );
        
        const updatedBook = await Book.findByIdAndUpdate(
            req.params?.bookId,
            {
               $push: {
                    copyHolder: reserveFor?._id,
               }, 
               $set: {
                    availableCopies: newCopies,
               },
            },
            {
                new: true,
            }
        )
        // console.log(updatedBook);
        // console.log(updatedUser)
        
        return res  
                .status(200)
                .json(
                    new apiResponse(200, "Book added to user's book bank!", {updatedUser, updatedBook})
                )   
    } catch (error) {
        next(error)
    }
})

export const returnBook = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian, are you? Contact librarian to help you return this book!")
    }

    const { erpu } = req.body
        if(!erpu?.trim()){
            throw new apiError(406, "Please enter email or rollNumber or phone or username")
        }
        let query = {};
    
        const dseuEmailPattern = /^[a-zA-Z0-9._%+-]+@dseu\.ac\.in$/;
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

        try {
            const bookReturner = await User.findOne(query);
            if(!bookReturner){
                throw new apiError(404, "User with this credentials doesn't exist")
            }
            
            // console.log(bookReturner.bookBank);
            // console.log(req.params?.bookId)
            const bookForReturn = await Book.findById(req.params?.bookId);
            const newCopies = parseInt(bookForReturn.availableCopies)+1;
            
            if(!bookForReturn){
                throw new apiError(500, "internal server error! book to be returned, data of it isn't available")
            }
            // console.log(bookForReturn)
            let flag = false;
            if(
                bookReturner.bookBank.some((book)=>{
                    return book == req.params?.bookId
                })
            ){
                flag = true;
            }
            
            if(!flag){
                throw new apiError(404, "Book to be return isn't found!")
            }
        
            const updatedUser = await User.findByIdAndUpdate(
                bookReturner?._id,
                {
                    $pull:{
                        bookBank: bookForReturn?._id,
                    }
                }, {
                    new: true,
                }
            );
            
            const updatedBook = await Book.findByIdAndUpdate(
                req.params?.bookId,
                {
                   $pull: {
                        copyHolder: bookReturner?._id,
                   }, 
                   $set: {
                        availableCopies: newCopies,
                   },
                },
                {
                    new: true,
                }
            )
    
            return res
                    .status(200)
                    .json(
                        new apiResponse(200, "book returned!", {updatedUser, updatedBook})
                    )
        } catch (error) {
            next(error)
        }
})

export const getLoanDetail = asyncHandler(async (req, res, next)=>{

})

export const getAllLonedBooks = asyncHandler(async (req, res, next)=>{

})

export const getLoneHistoryOfUser = asyncHandler(async (req, res, next)=>{
                        
})

export const getOverDueLone = asyncHandler(async (req, res, next)=>{

})

export const getDueSoonLone = asyncHandler(async (req, res, next)=>{

})