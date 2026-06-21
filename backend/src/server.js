import express from "express";
import "./config/env.js";
import { connectDB }  from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import billRouter from './routes/bill.routes.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
origin: process.env.CLIENT_ORIGIN || "*"
}));
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

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
    });
});

connectDB().then(() => {
    app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`); 
});
});
