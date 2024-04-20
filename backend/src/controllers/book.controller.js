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
    const allBooks = await Book.find({});
    if(!allBooks){
        throw new apiError(404, "Error in fetching all books!")
    }
    return res
        .status(200)    
        .json(
            new apiResponse(200, "Books fetched!", allBooks)
        ) 
    
})

export const getBook = asyncHandler(async (req, res, next)=>{
    const getBook = await Book.findById(req.params?.bookId);
    if(!getBook){
        throw new apiError(404, "Book not found!")
    }

    return res  
            .status(200)
            .json(
                new apiResponse(200, "book found!", getBook)
            )
})

export const updateBook = asyncHandler(async (req, res, next)=>{

})

export const deleteBook =  asyncHandler(async (req, res, next)=>{

})

export const getAvailableBooks = asyncHandler(async (req, res, next)=>{

})

export const searchBook = asyncHandler(async(req, res, next)=>{

})