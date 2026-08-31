import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const sellerLogin = asyncHandler(async (req, res) => {
	const { email, password } = req?.body || {};

	if (
		password === process.env.SELLER_PASSWORD &&
		email === process.env.SELLER_EMAIL
	) {
		const token = jwt.sign({ email }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		});
		res.status(200).json({
			success: true,
			message: "Login Successful",
		});
	} else {
		res.status(400).json({
			success: true,
			message: "Invalid Credentials",
		});
	} 
});

export const isSellerAuth = asyncHandler(async(req, res) => {
    return res.status(200).json({success: true})
})

export const sellerLogout = asyncHandler(async(req, res) => {
    res.clearCookie('sellerToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })
    res.status(200).json({success: true, message: "Logout Successful"})
})

