import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connect to the database");

    } catch (error) {
        console.error("Error connecting to Database.");
        process.exit(1);
    }
}