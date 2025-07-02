import express from "express";
const userRouter = express.Router();
import { getUsers,getUserById,createUser,updateUser,deleteUser } from "../controllers/user.controller.js";
import { authorize } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';

// GET 
userRouter.get("/",authorize,requireRole('admin'),getUsers);

// GET (by id)
userRouter.get("/:id",authorize,getUserById);

// POST
userRouter.post("/",authorize,createUser);

// PUT
userRouter.put("/:id",authorize,updateUser);

// DELETE 
userRouter.delete("/:id",authorize,requireRole('admin'),deleteUser);

export default userRouter;
