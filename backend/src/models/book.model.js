import mongoose from "mongoose";
import { type } from "os";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true, 
        },
        isbn: {
            type: String,
            require: true,
            unique: true,
        },
        topic: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            required: true,
        },
        branchSpecific: {
            type: String,
            enum: ['CSE', 'ECE', 'MAE']
        },
        availableCopies: {
            type: Number,
            required: true,
        },
        totalCopies: {
            type: Number,
            require: true,
        },
        photoURL: {
            type: String,
            default: "https://tse3.mm.bing.net/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&pid=Api&P=0&h=180"
        },
        copyHolder: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ]
        },
    }, {timestamps: true}
);

const Book = new mongoose.model("Book", bookSchema);
export default Book;