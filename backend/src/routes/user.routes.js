import express from "express";
const userRouter = express.Router();
import { getUsers,getUserById,createUser,updateUser,deleteUser } from "../controllers/user.controller.js";

// GET 
userRouter.get("/",getUsers);

// GET (by id)
userRouter.get("/:id",getUserById);

// POST
userRouter.post("/",createUser);

// PUT
userRouter.put("/:id",updateUser);

// DELETE 
userRouter.delete("/:id",deleteUser);

export default userRouter;
