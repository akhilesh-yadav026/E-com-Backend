import express from "express";
import { placeOrder , placeOrderStripe , placeOrderRazorpay, allOrders , userOrders , updateStatus} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from '../middleware/auth.js'
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth , allOrders )
orderRouter.post('/status', adminAuth , updateStatus )

// Payment Features
orderRouter.post('/place' , userAuth , placeOrder)
orderRouter.post('/stripe' , userAuth , placeOrderStripe)
orderRouter.post('/razorpay' , userAuth , placeOrderRazorpay)


// User Feature
orderRouter.post('/userorders' , authUser , userOrders)

export default orderRouter