import express from "express"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import apiResponse from "./utils/apiResponse.js"

dotenv.config({path: './.env'});

const app = express();

//cors origin
//cookieParser
//json
//urlencoded
//static
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        Credential: true,
    }
));

app.use(cookieParser());
app.use(express.json({limit: "16kb"})); // to send json data
app.use(express.urlencoded(   //to send urlencoded data like slug.includes(+, -) 
    {
        extended: true,
        limit: "16kb"
    }
));

app.use(express.static("public")); 



// import routers
import authRouter from "./routes/auth.route.js";
import bookRouter from "./routes/book.route.js";
import loneRouter from "./routes/reservedBook.route.js";
import userRouter from "./routes/user.router.js";


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/book', bookRouter)
app.use('/api/v1/book-lone', loneRouter)
app.use('/api/v1/user', userRouter)




app.use((err, req, res, next)=>{
    res
    .status(err.statusCode||500)
    .json(
        new apiResponse(err.statusCode||400, err.message||"something went wrong", null)
    );
});

export default app;