import express from "express";
const userRouter = express.Router();
import { getUsers,getUserById,createUser,updateUser,deleteUser, updateUserAddress, updateUserName, updateUserPhoneNumber, updateUsername, updateUserPassword } from "../controllers/user.controller.js";
import { authorize } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/requireRole.middleware.js';
import { use } from "react";

// GET 
userRouter.get("/",authorize,requireRole('admin'),getUsers);

// GET (by id)
userRouter.get("/profile",authorize,getUserById);

// POST
userRouter.post("/",authorize, requireRole('admin'),createUser);

// PUT
userRouter.put("/profile-update/name",authorize,updateUserName);

// PUT
userRouter.put("/profile-update/address",authorize,updateUserAddress);

// PUT
userRouter.put("/profile-update/username",authorize,updateUsername);

// PUT
userRouter.put("/profile-update/phone",authorize,updateUserPhoneNumber);

//PUT
userRouter.put("/profile-update/password",authorize,updateUserPassword);

// PUT
userRouter.put("/profile-update",authorize,updateUser);


// DELETE 
userRouter.delete("/:id",authorize,requireRole('admin'),deleteUser);

export default userRouter;
