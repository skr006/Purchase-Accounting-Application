import User from "../models/user.model.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password -updatedAt -createdAt -__v');
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-_id -password -updatedAt -createdAt -__v');
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
            { new: true }
        );

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};