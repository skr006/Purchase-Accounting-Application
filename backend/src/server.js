import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Inital Route
app.get('/',(req,res)=>{
    res.send("Welcome to our Application");
})

app.listen(5001,()=>{
    console.log(`Server started on http://localhost:${PORT}`); 
})