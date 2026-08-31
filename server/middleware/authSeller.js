import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const authSeller = asyncHandler(async (req, res, next) => {
	const { sellerToken } = req.cookies;

	if (!sellerToken) {
		return res
			.status(401)
			.json({ success: true, message: "Not Authorized" });
	}

	const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

	if (tokenDecode.email === process.env.SELLER_EMAIL) {
		next();
	} else {
		return res.json({ success: false, message: "Not Authorized" });
	}
});
