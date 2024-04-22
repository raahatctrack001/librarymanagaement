import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        rollNumber: {
            type: String,
            required: [true, "Exam me mat bhool jana!, yaha to roll no bata padega boss!"],
            unique: true,
        },
        yearOfJoining: {
            type: String, 
            require: [true, "Date of birth nhi mangi hai jo itne nakhre kar rhe ho!"]
        }, 
        branch: {
            type: String,
        },
        profilePhoto: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
        refreshToken: {
            type: String,
            default:""
        }, 
        isAdmin: {
            type: Boolean,
            default: false,
        }
        
    }, {timestamps: true}
);

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcryptjs.hashSync(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcryptjs.compareSync(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            rollNumber: this.rollNumber,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

const User = new mongoose.model("User", userSchema);
export default User;