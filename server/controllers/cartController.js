import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";

export const updateCart = asyncHandler(async(req, res) => {
    const {userId, cartItems} = req?.body || {}
    await User.findByIdAndUpdate(userId, {cartItems})
    res.status(200).json({success: true, message: "Cart Updated"})
})