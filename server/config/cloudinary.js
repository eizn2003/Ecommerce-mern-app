import {v2 as cloudinary} from "cloudinary"
import asyncHandler from "express-async-handler"

export const connectCloudinary = asyncHandler(async() => {
    cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
	});
})