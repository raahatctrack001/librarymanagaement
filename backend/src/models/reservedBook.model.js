import mongoose  from "mongoose";
import { deflate } from "zlib";

const reservedBookSchema = new mongoose.Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        loanDate: {
            type: Date,
            require: true,
        },
        expectedReturnDate: {
            type: Date,
            require: true,
        },
        acutalReturnDate: {
            type: Date,
        },
        fineIfApplicable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fine"
        }
    }, {timestamps: true}
)

const ReservedBook = new mongoose.model("ReservedBook", reservedBookSchema);
export default ReservedBook;