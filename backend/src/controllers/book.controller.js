import {bookData }from "../../bookData.js";
import Book from "../models/book.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const addBook = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(403, "You are not allowed to add book in book store!")
    }

    const { title, isbn, topic, author, branchSpecific, availableCopies, totalCopies } = req.body
    if(
        [
            title, 
            isbn, 
            topic, 
            author, 
            branchSpecific, 
            availableCopies, 
            totalCopies
        ].some(field=>field?.trim()?0:1)
    ){
        throw new apiError(406, "All field's are mendatory!")
    }

    try {
        const checkIfExists = await Book.findOne({isbn});
        if(checkIfExists){
            throw new apiError(409, 'Book with this isbn already exist!')
        }

        const newBook = await Book.create({
            title, 
            isbn, 
            topic, 
            author, 
            branchSpecific, 
            availableCopies, 
            totalCopies
        });

        if(!newBook){
            throw new apiError(500, "failed to add book to book store!")
        }

        return res  
                .status(200)
                .json(
                    new apiResponse(200, "New book added", newBook)
                )
    } catch (error) {
        next(error)
    }
    
})

export const getAllBooks = asyncHandler(async (req, res, next)=>{
    console.log("api fired!")
    const allBooks = await Book.find({});
    console.log(allBooks)
    
})

export const getBook = asyncHandler(async (req, res, next)=>{
})

export const updateBook = asyncHandler(async (req, res, next)=>{

})

export const deleteBook =  asyncHandler(async (req, res, next)=>{

})

export const getAvailableBooks = asyncHandler(async (req, res, next)=>{

})

export const searchBook = asyncHandler(async(req, res, next)=>{

})