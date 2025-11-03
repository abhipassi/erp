  // import bcrypt from 'bcryptjs';
  // import jwt from 'jsonwebtoken';
  // import  Login  from '../models/login.js'; 
  // import { Op } from 'sequelize'; 


  // export const login = async (req, res) => {
  //   const { username, password } = req.body;

  //   if (!username || !password) {
  //     return res.status(400).json({ message: 'Username and password are required' });
  //   }

  //   try {

  //     const user = await Login.findOne({
  //       where: {
  //         [Op.or]: [{ username }, { email: username }],
  //       },
  //     });

  //     if (!user) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }

  //     const isPasswordValid = await user.validPassword(password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }
  //     user.last_login = new Date();
  //     await user.save();

  //     // Generate JWT token
  //     const token = jwt.sign(
  //       { userId: user.id, username: user.username, role: user.role },
  //       process.env.JWT_SECRET_KEY, 
  //       { expiresIn: '1h' } // Token expires in 1 hour
  //     );

  //     // Return the response with token and user info
  //     res.status(200).json({
  //       message: 'Login successful',
  //       token,
  //       user: {
  //         id: user.id,
  //         username: user.username,
  //         email: user.email,
  //         role: user.role,
  //         last_login: user.last_login,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // };
// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Login from "../models/login.js";
import { Op } from "sequelize";

export const registerUser = async (req, res) => {
  const { name, email, mobileNumber, password, confirmPassword, role } = req.body;

  // Basic validation
  if (!name || !email || !mobileNumber || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await Login.findOne({
      where: { [Op.or]: [{ email }, { username: name }] },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await Login.create({
      username: name,
      email,
      password_hash: password, // will be hashed by model hook
      role: role || "student",
    });

    return res.status(201).json({
      message: "Signup successful! Please login.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await Login.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.last_login = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        last_login: user.last_login,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
