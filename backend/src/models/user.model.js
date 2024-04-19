import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Don't be shy at telling your name!😑"],
            trim: true, 
        },
        username: {
            type: String,
            required: [true, "Design a username as unique as you are!😎"],
            unique: true,
            lowercase: true,
            trim: true, 
        } ,
        email: {
            type: String,
            required: [true, "Enter your dseu email!"],
            unique: [true, "you email is already in use! kispar bharosa kiya?"],
            index: true,
            lowecase: true,
            trim: true,      
        },
        phone: {
            type: String,
            required: [true, "Don't worry, kisi ko pta nhi chalega!🤫"],
            unique: [true, "this number is already in use, try another number"],
        }, 
        collegeId: {
            type: String,
            required: [true, "Exam me mat bhool jana id Card!, yaha to clg id dikhana padega!"],
            unique: true,
        },
        yearOfJoining: {
            type: String, 
            require: [true, "Date of birth nhi mangi hai jo itne nakhre kar rhe ho!"]
        }, 
        branch: {
            type: String,
        },
        photoURL: {
            type: String,
        },
        bookBank: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'reservedBook',
                }
            ]
        },
        password: {
            type: String,
            require: true,
        },
        confirmPassword: {
            type: String,
            require: true,
        },
        refreshToken: {
            type: String,
        }, 
        isAdmin: {
            type: Boolean,
            default: false,
        }
        
    }, {timestamps: true}
);

const User = new mongoose.model("User", userSchema);
export default User;