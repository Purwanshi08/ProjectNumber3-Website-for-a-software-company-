import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !password || !email) {
            return res.status(400).json({ message: "User credentials required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ _id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        res.cookie("accessToken", token, { httpOnly: false, secure: false }); // Set the cookie
        res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "User credentials required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        res.cookie("accessToken", token, { httpOnly: false, secure: false }); // Set the cookie
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    res.cookie("accessToken", "", { httpOnly: true, expires: new Date(0) }); // Clear the cookie
    res.status(200).json({ message: "Logout successful" });
};

export {
    loginUser,
    createUser,
    logoutUser
};
