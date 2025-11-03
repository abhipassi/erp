// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Login from "../models/login.js";
import { Op } from "sequelize";


// User Signup

export const signup = async (req, res) => {
  try {
    const { username, email, mobileNumber, password, role } = req.body;

    // Check if user already exists
    const existingUser = await Login.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (password hashing handled in model hook)
    const newUser = await Login.create({
      username,
      email,
      mobileNumber,
      password_hash: password,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// =============================
//  User Login (Email OR Username)
// =============================
export const login = async (req, res) => {
  try {
    // Fix: frontend sends `username` — use that as identifier
    const { username, password } = req.body;
    const identifier = username; // username can be username or email

    // Find user by email OR username
    const user = await Login.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT (not saved in DB)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Update last login
    user.last_login = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
