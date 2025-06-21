import express from "express";
import dotenv from "dotenv";
import { connectDB }  from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

//Inital Route;
app.get('/',(req,res)=>{
    res.send("Welcome to our Application");
})

// Auth Route
app.use('/api/v1/auth',authRouter);

//Users Route;
app.use('/api/v1/users',userRouter);


connectDB().then(() => {
    app.listen(5001,()=>{
    console.log(`Server started on http://localhost:${PORT}`); 
});
});