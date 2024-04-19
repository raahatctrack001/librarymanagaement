import mongoose from 'mongoose';

import dotenv from 'dotenv'

dotenv.config({path:'./.env'})

const connectDatabase = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
        console.log(`MongoDB connected, HOST: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("FAILED! to connect database.");
        process.exit(1);
    }
}

export default connectDatabase;