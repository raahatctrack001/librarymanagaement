import app from "./app.js";
import dotenv from 'dotenv';
import connectDatabase from "./database/connect.database.js";

dotenv.config({path:'./.env'});

connectDatabase()
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log(`server is up and running on port ${process.env.PORT}`)
        })
    })
    .catch((error)=>{
        console.log("MongoDB connection FAILED", error);
    });


    