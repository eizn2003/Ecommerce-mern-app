import express from 'express'
import { upload } from '../config/multer.js';
import { authSeller } from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

export const productRouter = express.Router();

productRouter.post('/add', upload.array("images", 4), authSeller, addProduct)
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)