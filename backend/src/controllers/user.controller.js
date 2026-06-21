import User from "../models/user.model.js";

const normalizeText = (value) => typeof value === "string" ? value.trim() : "";

const handleControllerError = (res, error) => {
    if (error?.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || "field";
        return res.status(409).json({
            success: false,
            message: `A user with this ${field} already exists`,
        });
    }

    return res.status(500).json({
        success: false,
        message: error.message,
    });
};

const publicUserQuery = "-password -updatedAt -createdAt -__v";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select(publicUserQuery);
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select(publicUserQuery);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const createUser = async (req, res) => {
    try {
        const firstName = normalizeText(req.body?.name?.firstName);
        const lastName = normalizeText(req.body?.name?.lastName);
        const email = normalizeText(req.body?.email).toLowerCase();
        const username = normalizeText(req.body?.username);
        const password = req.body?.password;
        const role = req.body?.role === "admin" ? "admin" : "user";

        if (!firstName || !lastName || !email || !username || !password) {
            return res.status(400).json({ success: false, message: "All user fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: existingUser.email === email ? "User already exists." : "Username already exists.",
            });
        }

        const newUser = await User.create({
            name: { firstName, lastName },
            email,
            password,
            username,
            role,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser.toSafeJSON(),
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUsername = async (req, res) => {
    try {
        const username = normalizeText(req.body?.username);

        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        const existingUser = await User.findOne({ username, _id: { $ne: req.user._id } });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Username already exists" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { username },
            { new: true, runValidators: true }
        ).select(publicUserQuery);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Username updated successfully",
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUserAddress = async (req, res) => {
    try {
        const address = {
            street: normalizeText(req.body?.street),
            area: normalizeText(req.body?.area),
            city: normalizeText(req.body?.city),
            state: normalizeText(req.body?.state),
            country: normalizeText(req.body?.country),
            zipCode: normalizeText(req.body?.zipCode),
        };

        if (Object.values(address).some((value) => !value)) {
            return res.status(400).json({ success: false, message: "All address fields are required" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { address },
            { new: true, runValidators: true }
        ).select(publicUserQuery);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUserPhoneNumber = async (req, res) => {
    try {
        const phoneNumber = normalizeText(req.body?.phoneNumber);

        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: "A valid 10-digit phone number is required" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { phoneNumber },
            { new: true, runValidators: true }
        ).select(publicUserQuery);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Phone number updated successfully",
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUserName = async (req, res) => {
    try {
        const firstName = normalizeText(req.body?.firstName);
        const lastName = normalizeText(req.body?.lastName);

        if (!firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: "Both first name and last name are required",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name: { firstName, lastName } },
            { new: true, runValidators: true }
        ).select(publicUserQuery);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Name updated successfully",
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUserPassword = async (req, res) => {
    try {
        const currentPassword = req.body?.currentPassword;
        const newPassword = req.body?.newPassword;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }

        if (typeof newPassword !== "string" || newPassword.trim().length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters long",
            });
        }

        const user = await User.findById(req.user._id).select("+password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const updateUser = async (req, res) => {
    try {
        const updates = {};

        if (req.body?.name) {
            const firstName = normalizeText(req.body.name.firstName);
            const lastName = normalizeText(req.body.name.lastName);
            if (!firstName || !lastName) {
                return res.status(400).json({ success: false, message: "Both first name and last name are required" });
            }
            updates.name = { firstName, lastName };
        }

        if (req.body?.email !== undefined) {
            const email = normalizeText(req.body.email).toLowerCase();
            if (!email) {
                return res.status(400).json({ success: false, message: "Email is required" });
            }
            updates.email = email;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ success: false, message: "No supported profile fields provided" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            { new: true, runValidators: true }
        ).select(publicUserQuery);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        return handleControllerError(res, error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        if (String(req.params.id) === String(req.user._id)) {
            return res.status(400).json({ success: false, message: "Admins cannot delete their own account from this route" });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
