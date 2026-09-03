import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
	const result = await cloudinary.uploader.upload("../client/src/assets/compressed/Gemini_Generated_Image_1st4sd1st4sd1st4.jpg", {
		resource_type: "image",
	});

	console.log("SUCCESS:", result);
} catch (error) {
	console.dir(error, { depth: null });

	console.log("STATUS:", error.http_code);
	console.log("MESSAGE:", error.message);
	console.log("RESPONSE:", error.response);
	console.log("BODY:", error.body);
}
