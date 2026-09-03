import asyncHandler from "express-async-handler";
import { Address } from "../models/address.js";

//Add address : /api/address/add
export const addAddress = asyncHandler(async(req, res) => {
    console.log(req.body)
    const {address} = req?.body || {}
    const {userId} = req;
    
    if(address.length < 9) {
        return res.status(400).json({success: false, message: "Please fill all the fields"})
    }
    await Address.create({...address, userId})
    res.status(200).json({success: true, message: "Address added successfully"})
})

//Add address : /api/address/get
export const getAddress = asyncHandler(async(req, res) => {
    const { userId } = req;
    const addresses = await Address.find({userId})
    res.status(200).json({
		success: true,
		message: "Address added successfully",
        addresses
	});
})