import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authUser = asyncHandler(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return res
			.status(401)
			.json({ success: false, message: "Not Authorized" });
	}

	const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
	if (tokenDecode.id) {
		req.userId = tokenDecode.id;
	} else {
		return res
			.status(401)
			.json({ success: false, message: "Not Authorized" });
	}
	next();
});
