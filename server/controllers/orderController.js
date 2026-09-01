import asyncHandler from "express-async-handler";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

//place order COD : /api/order/cod

export const placeOrderCOD = asyncHandler(async(req, res) => {
    const {userId, items, address} = req?.body || {}

    if(!address || items.length === 0 ){
        return res.json({success: false, message: "Invalid data"})
    }

    let amount = await items.reduce(async(acc, item) => {
        const product = await Product.findById(item.product)
        return (await acc) + product.offerPrice * item.quantity
    }, 0)

    //Add tax charge (2%)
    amount += Math.floor(amount * 0.02)

    await Order.create({
        userId,
        items,
        amount, 
        address,
        paymentType: "COD"
    })

    return res.status(200).json({success: true, message: "Order placed Successfully"})
})

//get orders by user ID : /api/order/user

export const getUserOrders = asyncHandler(async(req, res) => {
    const {userId} = req?.body || {}

    const orders = await Order.find({
        userId,
        $or: [{paymentType: "COD"}, {isPaid: true}]
    }).populate("items.product address").sort({createdAt: -1})
    res.status(200).json({success: true, orders})
})

export const getAllOrders = asyncHandler(async(req, res) => {
    const {userId} = req?.body || {}

    const orders = await Order.find({
        $or: [{paymentType: "COD"}, {isPaid: true}]
    }).populate("items.product address").sort({createdAt: -1})
    res.status(200).json({success: true, orders})
})