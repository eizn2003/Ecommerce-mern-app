import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import chalk from "chalk";
import "dotenv/config";

export const connectDB = asyncHandler(async () => {
	mongoose.connection.on("connected", () => {
		console.log(chalk.greenBright("Database connected successfully"));
	});
	await mongoose.connect(`${process.env.MONGODB_URI}/trendora`);
});
