import express from "express";
import dotenv from "dotenv";
import { connectDB }  from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import billRouter from './routes/bill.route.js';

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

//Users Route
app.use('/api/v1/users',userRouter);

//Bill Route
app.use('/api/v1/bills', billRouter);

connectDB().then(() => {
    app.listen(5001,()=>{
    console.log(`Server started on http://localhost:${PORT}`); 
});
});