import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.js";



export const addProduct = asyncHandler(async (req, res) => {
	
	try {
		let productData = JSON.parse(req.body.productData);

		const images = req.files;

		if(!images || images.length === 0) {
			return res.status(400).json({ success: false, message: "No images uploaded" });
		}

		let imagesUrl = await Promise.all(
			images.map(async (item) => {
				let result = await cloudinary.uploader.upload(item.path, {
					resource_type: "image",
				});
				return result.secure_url;
			}),
		);

		await Product.create({ ...productData, image: imagesUrl });

		res.status(201).json({ success: true, message: "Product added" });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

export const productList = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, products });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });		
	}
});

export const productById = asyncHandler(async (req, res) => {
	try {
		const { id } = req?.body || {};
		const product = await Product.findById(id);
		res.status(200).json({ success: true, product });
	} catch (error) {
		console.log(error.message);
		res.json({ success: false, message: error.message });
	}
});

export const changeStock = asyncHandler(async (req, res) => {
	try {
		const { id, inStock } = req?.body || {};
		await Product.findByIdAndUpdate(id, { inStock });
		res.status(200).json({ success: true, message: "Stock Updated" });
	} catch (error) {
		console.log(error.message);
		res.json({ success: false, message: error.message });
	}
});
