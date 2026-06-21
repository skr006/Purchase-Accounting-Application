import mongoose from "mongoose";
import "./env.js";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_DB) {
            throw new Error("MONGO_DB is not configured");
        }

        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to Database.", error.message);
        process.exit(1);
    }
}
