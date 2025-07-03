import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current directory since you're using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to Database.", process.env.MONGO_DB, error);
        process.exit(1);
    }
}
