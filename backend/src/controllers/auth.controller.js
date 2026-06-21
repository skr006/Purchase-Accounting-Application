import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import '../config/env.js';

const createToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

const normalizeText = (value) => typeof value === 'string' ? value.trim() : '';

export const signUp = async (req, res, next) => {
  try {
    const firstName = normalizeText(req.body?.name?.firstName);
    const lastName = normalizeText(req.body?.name?.lastName);
    const email = normalizeText(req.body?.email).toLowerCase();
    const username = normalizeText(req.body?.username);
    const password = req.body?.password;

    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({ success: false, message: 'All signup fields are required.' });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser?.email === email) {
      return res.status(400).json({ success: false, message: 'User already exists.' });
    }

    if (existingUser?.username === username) {
      return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    const newUser = await User.create({
      name: { firstName, lastName },
      email,
      password,
      username,
      role: 'user',
    });

    const token = createToken(newUser._id);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUser.toSafeJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const email = normalizeText(req.body?.email).toLowerCase();
    const password = req.body?.password;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: user.toSafeJSON(),
      },
    });
  } catch (error) {
    next(error);
  }
};
