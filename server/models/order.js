import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	userId: { type: string, required: true, ref: "user" },
	items: [
		{
			product: { type: String, required: true, ref: "product" },
			quantity: { type: Number, required: true },
		},
	],
	amount: { type: Number, required: true },
	amount: { type: String, required: true, ref: "address" },
	status: { type: Number, default: 'Order Placed' },
    paymentType: {type: Boolean, required: true},
    isPaid: {type: Boolean, required: true, default: false}
}, {timnestamps: true});

export const Order = mongoose.model.order || mongoose.model('order', orderSchema)