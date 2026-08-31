import asyncHandler from "express-async-handler";
import { Address } from "../models/address.js";

//Add address : /api/address/add
export const addAddress = asyncHandler(async(req, res) => {
    const {address, userId} = req?.body || {}
    await Address.create({...address, userId})
    res.status(200).json({success: true, message: "Address added successfully"})
})

//Add address : /api/address/get
export const getAddress = asyncHandler(async(req, res) => {
    const { userId } = req?.body || {};
    const addresses = await Address.find({userId})
    res.status(200).json({
		success: true,
		message: "Address added successfully",
        addresses
	});
})