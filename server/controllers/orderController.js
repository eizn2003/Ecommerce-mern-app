import asyncHandler from "express-async-handler";
import { Product } from "../models/product.js";
import { Order } from "../models/order.js";
import stripe, { Stripe } from "stripe";
import { User } from "../models/user.js";

//place order COD : /api/order/cod
export const placeOrderCOD = asyncHandler(async (req, res) => {
	const { items, address } = req?.body || {};
	const { userId } = req;

	if (!address || items.length === 0) {
		return res.json({ success: false, message: "Invalid data" });
	}

	let amount = await items.reduce(async (acc, item) => {
		const product = await Product.findById(item.product);
		return (await acc) + product.offPrice * item.quantity;
	}, 0);

	//Add tax charge (2%)
	amount += Math.floor(amount * 0.02);
	console.log(amount);

	await Order.create({
		userId,
		items,
		amount,
		address,
		paymentType: "COD",
	});

	return res
		.status(200)
		.json({ success: true, message: "Order placed Successfully" });
});

//place order SRTIPE : /api/order/stripe

export const placeOrderStripe = asyncHandler(async (req, res) => {
	const { items, address } = req?.body || {};
	const { userId } = req;

	const { origin } = req?.headers || {};

	if (!address || items.length === 0) {
		return res.json({ success: false, message: "Invalid data" });
	}

	let productData = [];

	let amount = await items.reduce(async (acc, item) => {
		const product = await Product.findById(item.product);
		productData.push({
			name: product.name,
			price: product.offPrice,
			quantity: item.quantity,
		});
		return (await acc) + product.offPrice * item.quantity;
	}, 0);

	//Add tax charge (2%)
	amount += Math.floor(amount * 0.02);
	console.log(amount);

	const order = await Order.create({
		userId,
		items,
		amount,
		address,
		paymentType: "Online",
	});

	//Stripe gateway Initialize
	const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

	//create line items for stripe
	const line_items = productData.map((item) => {
		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: item.name,
				},
				unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
			},
			quantity: item.quantity,
		};
	});

	//create session
	const session = await stripeInstance.checkout.sessions.create({
		line_items,
		mode: "payment",
		success_url: `${origin}/loader?next=my-orders`,
		cancel_url: `${origin}/loader?next=cart`,
		metadata: {
			orderId: order._id.toString(),
			userId,
		},
	});

	return res.status(200).json({ success: true, url: session.url });
});

//Stripe webhooks to verify payments action: /stripe

export const stripeWebHooks = asyncHandler(async (request, response) => {
	//Stripe gateway Initialize
	const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

	const sig = request.headers["stripe-signature"];
	let event;

	try {
		event = stripeInstance.webhooks.constructEvent(
			request.body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (error) {
		response.status(400).send(`Webhook Errro: ${error.message}`);
	}

	//Handle the event
	switch (event.type) {
		case "payment_intent.succeeded": {
			const paymentIntent = event.data.object;
			const paymentIntentId = paymentIntent.id;

			//getting session metadata
			const session = await stripeInstance.checkout.sessions.list({
				payment_intent: paymentIntentId,
			});

			const { orderId, userId } = session.data[0].metadata;
			//Mark payment as paid
			await Order.findByIdAndUpdate(orderId, { isPaid: true });
			//clear user cart
			await UserActivation.findByIdAndUpdate(userId, { cartItems: {} });
			break;
		}
		case "payment_intent.succeeded": {
			const paymentIntent = event.data.object;
			const paymentIntentId = paymentIntent.id;

			//getting session metadata
			const session = await stripeInstance.checkout.sessions.list({
				payment_intent: paymentIntentId,
			});

			const { orderId } = session.data[0].metadata;
			await Order.findByIdAndDelete(orderId);
			break;
		}
		default:
			console.error(`Unhandled event type ${event.type}`);
			break;
	}
	response.json({ received: true });
});

//get orders by user ID : /api/order/user

export const getUserOrders = asyncHandler(async (req, res) => {
	const { userId } = req;

	const orders = await Order.find({
		userId,
		$or: [{ paymentType: "COD" }, { isPaid: true }],
	})
		.populate("items.product address")
		.sort({ createdAt: -1 });
	res.status(200).json({ success: true, orders });
});

export const getAllOrders = asyncHandler(async (req, res) => {
	const { userId } = req;

	const orders = await Order.find({
		$or: [{ paymentType: "COD" }, { isPaid: true }],
	})
		.populate("items.product address")
		.sort({ createdAt: -1 });
	res.status(200).json({ success: true, orders });
});
