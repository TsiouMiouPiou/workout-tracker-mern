import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connect to MongoDB");
    } catch (error) {
        console.log(`Error message ${error}`);
        process.exit(1)
    }
}