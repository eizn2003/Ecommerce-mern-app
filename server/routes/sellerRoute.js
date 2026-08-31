import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js'
import { authSeller } from '../middleware/authSeller.js'

export const sellerRouter = express.Router()

sellerRouter.post('/login', sellerLogin)
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get('/logout', authSeller, sellerLogout)
