import { isErrored } from "stream";
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
    console.log(allBooks.length)
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
    if(!req.user?.isAdmin){
        throw new apiError(401, "you are not allowed to update book!")
    }
    try {

        const formData = req.body;
        // const { title, isbn, topic, author, branchSpecific, availableCopies, totalCopies} = req.body
        // const existingBook = await Book.findById(req.params?.bookId);
        // const fieldToUpdate = {
        //         ...(existingBook.title !== title && { title: title }),
        //         ...(existingBook.isbn !== isbn && { isbn: isbn }),
        //         ...(existingBook.author !== author && { author: author }),
        //         ...(existingBook.topic !== topic && { topic: topic }),
        //         ...(existingBook.branchSpecific !== branchSpecific && { branchSpecific: branchSpecific }),
        //         ...(existingBook.availableCopies != availableCopies && { availableCopies: availableCopies }),
        //         ...(existingBook.totalCopies != totalCopies && { totalCopies: totalCopies }),
        // }
        // if(Object.keys(fieldToUpdate).length === 0){
        //     throw new apiError(204, "please make some changes then request again for update")
        // }
        const existingBook = await Book.findById(req.params?.bookId);
        let changes = {};

        for(const key in formData){
            if(formData[key] !== existingBook[key]){
                changes[key] = formData[key];
            }
        }
        if(Object.keys(changes).length == 0){
            throw new apiError(204, "plz make some changes then request for update!")
        }
        let updatedBook = null
        try{
            updatedBook = await Book.findByIdAndUpdate(
                req.user?.bookId,
                {
                    $set:{
                        changes,
                    }
                },
                {
                    new: true,
                },
            )
        }
        catch(error){
            next(error)
        }
        return res 
                .status(200)
                .json(
                    new apiError(200, "book updated!", updatedBook )
                )
    }
    catch(error){
        next(error);
    }

      
})

export const deleteBook =  asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "you are not allowed to make changes here!")
    }

    try{
        const deletedBook  = await Book.findByIdAndDelete(req.params?.bookId);
        console.log(deleteBook)
        if(!deletedBook){
            throw new apiError(404, "book to be deleted doesn't exist in this database!")
        }
        return res
                .status(200)
                .json(
                    new apiResponse(200, 'book deleted!')
                )
    }
    catch(error){
        next(error)
    }
    
})

export const getAvailableBooks = asyncHandler(async (req, res, next)=>{
    const allBooks = await Book.find({});
    
    if(!allBooks){
        throw new apiError(404, "Error in fetching all books!")
    }
   
    let availableBooks = [];
    allBooks.forEach(book => {
        if(book.availableCopies > 0){
            availableBooks.push(book)
        }
    });

    console.log(availableBooks.length)

    return res
            .status(200)
            .json(
                new apiResponse(200, "Avalable Books are here!", availableBooks)
            )
})

export const searchBook = asyncHandler(async(req, res, next)=>{
    const searchTerm = req.body.searchTerm;
    try {        
        const foundBooks = await Book.find({
            $or: [
                { isbn: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in ISBN field
                { author: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in author field
                { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in title field
                { topic: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in topic field
                { branchSpecific: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search in branch field
            ]
        });
    
        if(foundBooks.length == 0){
            return res  
                    .status(200)
                    .json(
                        new apiResponse(200, "No Match Found!")
                    )
        }
    
        return res  
                .status(200)
                .json(
                    new apiResponse(200, `${foundBooks.length} books with these keyword found!`, foundBooks)
                );
    } catch (error) {
        next(error)
    }
})