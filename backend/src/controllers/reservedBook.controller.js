import Book from "../models/book.model.js"
import User from "../models/user.model.js"
import apiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import apiResponse from "../utils/apiResponse.js"
import ReservedBook from "../models/reservedBook.model.js"
import Fine from "../models/fine.model.js"

const findQuery = (erpu)=>{
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
    return query;
}
export const reserveBook = asyncHandler(async (req, res, next)=>{
    console.log(req.params)
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian. are you?")
    }
    const erpu  = req.params?.userId;
    const query = findQuery(erpu);

    const reserveBookFor = await User.findOne(query);
    if(!reserveBookFor){
        throw new apiError(404, "User not Found!");
    }

    const bookToReserve = await Book.findById(req.params?.bookId);
    if(!bookToReserve){
        throw new apiError(404, "Book not Found!");
    }

    const checkIfAlreadyTaken = await ReservedBook.findOne({
        $and: [{userId: reserveBookFor?._id},{bookId: bookToReserve?._id}]
    })
    // takenBook === checkIfAlreadyTaken?._id //not acceptable convert in string or use equals
    // if(reserveBookFor.bookBank.some(takenBook=>takenBook.toString() === checkIfAlreadyTaken?._id.toString())){
    //     throw new apiError(406, "You can't have more than 1 copy of same book")
    // }
    if(reserveBookFor.bookBank.some(takenBook=>takenBook.equals(checkIfAlreadyTaken?._id))){
        throw new apiError(406, "You can't have more than 1 copy of same book")
    }    

    if(reserveBookFor.bookBank.length >= 5){
        throw new apiError(409, "you can hold at most 5 books at a time!")
    }

    const currentAvailabeCopies = bookToReserve.availableCopies;
    if(currentAvailabeCopies <= 0){
        throw new apiError(404, "Books out of stock!")
    }

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();


    currentMonth += 1; 
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    const oneMonthLaterDate = new Date(currentYear, currentMonth);    
    const loanedBook = await ReservedBook.create({
        bookId: bookToReserve,
        userId: reserveBookFor,
        loanDate: currentDate,
        expectedReturnDate: oneMonthLaterDate,
    })

    if(!loanedBook){
        throw new apiError(500, "Failed to reserve for you!")
    }

    //update user 
    const updatedUser = await User.findByIdAndUpdate(
        reserveBookFor?._id,
        {
            $push: {
                bookBank: loanedBook?._id
            },
        },
        {
            new: true,
        }
    )
    //update book
    const updatedBook = await Book.findByIdAndUpdate(
        bookToReserve?._id,
        {
            $push: {
                copyHolder: updatedUser?._id,
            },
            $set:{
                availableCopies: currentAvailabeCopies-1,
            }
        },
        {
            new: true,
        }
    )
    
    return res  
            .status(200)
            .json(
                new apiResponse(200, `one copy of book ${updatedBook.title} is now owned by ${updatedUser.fullName}`, loanedBook)
            )
})

export const returnBook = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian. are you?")
    }

    const erpu  = req.params?.userId;
    const query = findQuery(erpu); 

    const bookReturner = await User.findOne(query);
    if(!bookReturner){
        throw new apiError(404, "User not Found!");
    }   
    
    const bookToReturn = await Book.findById(req.params?.bookId);
    if(!bookToReturn){
        throw new apiError(404, "Book not Found!");
    } 

   
 
    // if(reserveBookFor.bookBank.length >= 5){
    //     throw new apiError(409, "you can hold at most 5 books at a time!")
    // } 
    const loanRecord = await ReservedBook.findOne({
        $and:[{userId: bookReturner?._id}, {bookId: bookToReturn?._id}]
    })

    if(!loanRecord){
        throw new apiError(404, "load record does not exist!")
    }
    let flag = false;
    if(bookReturner.bookBank.some(takenBook=>takenBook.equals(loanRecord?._id))){
        flag = true;
    }
    
    if(!flag){
        throw new apiError(409, "Book you are trying to return doesn't exist!")
    }

    const expectedReturnDate = loanRecord.expectedReturnDate
    const currentDate = new Date();
    const differenceInMilliseconds = expectedReturnDate-currentDate;
    const differenceInWeeks = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    
    let fine = 0;
    if(differenceInWeeks > 0){
        const finePerWeek = 100
        fine = finePerWeek*differenceInWeeks
    }
    
    const currentAvailabeCopies = bookToReturn.availableCopies; 
    const fineRecord = await Fine.create({
        load: loanRecord,
        fineAmount: fine,
        paid: true,
    })

    if(!fineRecord){
        throw new apiError(409, "fine error!")
    }
    loanRecord.acutalReturnDate = currentDate;
    loanRecord.fineIfApplicable = fineRecord;

    loanRecord
        .save()
        .then((savedRecord)=>{
            console.log(savedRecord)
        })
        .catch((error)=>next(error))  
    
    //update user 
    const updatedUser = await User.findByIdAndUpdate(
        bookReturner?._id,
        {
            $pull: {
                bookBank: loanRecord?._id
            },
        },
        {
            new: true,
        }
    )
    
    //update book
    const updatedBook = await Book.findByIdAndUpdate(
        bookToReturn?._id,
        {
            $pull: {
                copyHolder: bookReturner?._id,
            },
            $set:{
                availableCopies: currentAvailabeCopies+1,
            }
        },
        {
            new: true,
        }
    )

    return res  
            .status(200)
            .json(
                new apiResponse(200, `one copy of book ${updatedBook.title} is return by ${updatedUser.fullName}`, loanRecord)
            )

    
})

export const getLoanDetail = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian, are you? Contact librarian to help you return this book!")
    }

    const loanDetail = await Book.findById(req.params?.bookId);
    if(loanDetail?.copyHolder?.length === 0){
        throw new apiError(404, "No one is holding this book!")
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, `Book ${loanDetail.title} is held by ${loanDetail.copyHolder.length} student till now`, loanDetail)
        )
})

export const getAllLonedBooks = asyncHandler(async (req, res, next)=>{
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian, are you? Contact librarian to help you return this book!")
    }
    const allBooks = await Book.find({});

    let loanedBook = [];
    allBooks.forEach(book=>{
        if(book.copyHolder.length > 0){
            loanedBook.push(book);
        }
    })

    return res  
        .status(200)
        .json(
            new apiResponse(200, `${loanedBook.length} books has been loaned till now`, loanedBook)
        )
})

//leave for now!
export const getLoneHistoryOfUser = asyncHandler(async (req, res, next)=>{
    console.log(req.body)
    if(!req.user?.isAdmin){
        throw new apiError(401, "You are not a librarian, are you? Contact librarian to help you return this book!")
    }

    const { erpu } = req.body;
    const query = findQuery(erpu);
    const userId = await User.find(query);
    const allLoanes = await ReservedBook.find({userId: userId});
    console.log(allLoanes)

    return res
            .status(200)
            .json(
                new apiResponse(200, "loan history is here", allLoanes)
            )
    
})

export const getOverDueLone = asyncHandler(async (req, res, next)=>{
    const allBooks = await Book.find({});
    let loanedBooks;
    allBooks.forEach((book)=>{
        if(book.copyHolder.length){
            loanedBooks.push(book);
        }
    })

    let dueDateOverBooks;
    allBooks.forEach((book)=>{
        if(currentDate-book.expectedReturnDate < 0){
            dueDateOverBooks.push(book)
        }
    })

    return res  
            .status(200)
            .json(
                new apiResponse(200, `there are ${dueDateOverBooks.length} overdued books`, dueDateOverBooks)
            );
})

// export const getDueSoonLone = asyncHandler(async (req, res, next)=>{

// })