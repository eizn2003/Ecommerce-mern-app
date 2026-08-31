import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/userRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { sellerRouter } from "./routes/sellerRoute.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { productRouter } from "./routes/productRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { addressRouter } from "./routes/addressRoute.js";

await connectDB();
await connectCloudinary();

const app = express();
const PORT = process.env.PORT || 5000;

//Allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
	res.status(200).send("API is working");
});

app.use("/api/users", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
