import asyncHandler from "express-async-handler";
import { User } from "../models/user.js";

export const updateCart = asyncHandler(async (req, res) => {
	const { cartItems } = req?.body || {};
	const userId = req.userId || req?.body?.userId;

	if (!userId) {
		return res
			.status(401)
			.json({ success: false, message: "Not Authorized" });
	}

	const user = await User.findByIdAndUpdate(
		userId,
		{ cartItems },
		{ new: true },
	);

	if (!user) {
		return res
			.status(404)
			.json({ success: false, message: "User not found" });
	}

	res.status(200).json({ success: true, message: "Cart Updated", user });
});
