import mongoose from "mongoose";

const fineSchema = new mongoose.Schema(
    {
        loan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reservedBook'
        },
        fineAmount:{
            type: Number,
            required: true,
        },
        paid: {
            type:Boolean,
            default: false
        }
    },{timestamps: true}
);

const Fine = new mongoose.model("Fine", fineSchema);
export default Fine;