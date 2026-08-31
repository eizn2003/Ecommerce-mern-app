import mongoose from "mongoose";
import { authUser } from "../middleware/authUser.js";
import { updateCart } from "../controllers/cartController.js";


export const cartRouter = mongoose.Router();

cartRouter.post('/update', authUser, updateCart)