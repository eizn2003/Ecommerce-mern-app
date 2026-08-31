import asynchHandler from "express-async-handler";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

//register user
export const register = asyncHandler(async (req, res) => {
	const { name, email, password } = req?.body || {};

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ success: false, message: "Missing Details" });
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).json({
			success: false,
			message: "User already exists",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await User.create({ name, email, password: hashedPassword });

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	res.cookie("token", token, {
		httpOnly: true, //prevent javascript to access the cookie
		secure: process.env.NODE_ENV === "production", //Use secure cookies in production
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return res.status(201).json({
		success: true,
		message: "User has been created successfully",
		user: { email: user.email, name: user.name },
	});
});

//login user: /api/users/login

export const login = asyncHandler(async (req, res) => {
	const { email, password } = req?.body || {};

	if (!email || !password) {
		res.status(400).json({
			success: false,
			message: "Email and Password are required",
		});
	}
	const user = await User.findOne({ email });

	if (!user) {
		res.status(400).json({
			success: false,
			message: "Invalid Email or password",
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		res.status(400).json({
			success: false,
			message: "Invalid Email or password",
		});
	}

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
	res.cookie("token", token, {
		httpOnly: true, //prevent javascript to access the cookie
		secure: process.env.NODE_ENV === "production", //Use secure cookies in production
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return res.status(200).json({
		success: true,
		message: "Login successful",
		user: { email: user.email, name: user.name },
	});
});

//check Auth : /api/users/is-auth
export const checkAuth = asyncHandler(async(req, res) => {
    const {userId} = req?.body || {}

    const user = await User.findById(userId).select("-password")

    return res.status(200).json({success: true, message: "", user})
})

export const logout = asyncHandler(async(req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })
    res.status(200).json({success: true, message: "Logout Successful"})
})