
import { bookData } from "../../bookData.js";
import { userData } from "../../userData.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { findQuery } from "./reservedBook.controller.js";


export const addBook = asyncHandler(async (req, res, next)=>{
    // await  User.deleteMany({})
    // let n = 0
    // userData.map(async (user)=>{
    //     await User.create({
    //         fullName:user.     fullName, 
    //         username:user.     username, 
    //         email:user.        email, 
    //         phone:user.        phone, 
    //         rollNumber:user.   rollNumber, 
    //         yearOfJoining:user.yearOfJoining, 
    //         branch:user.       branch, 
    //         password:user.     password,
    //     })
    //     .then(()=>n+=1)
    //     .catch(error=>console.log(error.message))
    //     console.log('added: ', n)
    // })

    // console.log(n)
    console.log(req.user)
    if(!req.user?.isAdmin){
        throw new apiError(403, "You are not allowed to add book in book store!")
    }


    // let n = 0; bulk book add
    // await Book.deleteMany({})
    // bookData.map(async (book)=>{
    //     await Book.create({
    //         title: book.title, 
    //         isbn: book.isbn, 
    //         topic: book.topic, 
    //         author: book.author, 
    //         branchSpecific: book.branchSpecific, 
    //         availableCopies: book.availableCopies, 
    //         totalCopies: book.totalCopies
    //     })
    //     .then(()=>n+=1)
    //     .catch(error=>console.log(error))

    //     console.log(n)
    // })

    // await User.deleteMany({})
    //     .then(()=>console.log('deleted all users'))
    //     .catch((error)=>console.log(error))

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
    // console.log(req.body)
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

        // console.log(req.params)

        const updatedBook = await Book.findByIdAndUpdate(
            req.params?.bookId,
            {
                $set: changes // $set: changes not $set: { changes } $set: object not object inside object!
            },
            {
                new: true,
            }
        )
        if(!updatedBook){
            throw new apiError(500, "failed to update book!")
        }

        return res  
                .status(200)
                .json(
                    new apiResponse(200, "book updated", updatedBook)
                )
        
    }
    catch(error){
        next(error);
    }      
})

export const deleteBook =  asyncHandler(async (req, res, next)=>{
    console.log(req.params)
    if(!req.user?.isAdmin){
        throw new apiError(401, "you are not allowed to delete book!")
    }

    const adminId = req.params?.adminId;
    
    const query = findQuery(adminId);

    const admin = await User.findOne(query);
    if(!admin){
        throw new apiError(404, "Admin not found");
    }
    console.log(admin)
    if(!admin?.isAdmin){
        throw new apiError(409, "Only admin can delete books.")
    }

    const bookToDelete = await Book.findById(req.params?.bookId)
    if(!bookToDelete){
        throw new apiError(404, "Book to be deleted doesn't exist")
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
                    new apiResponse(200, `book ${bookToDelete?.title} is being deleted by ${admin?.fullName}`)
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