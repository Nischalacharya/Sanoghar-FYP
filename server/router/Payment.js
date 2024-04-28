import express from "express";
import { CreatePayment, VerifyPayment, GetPayment, GetPaymentByHostel } from "../controller/Payment.js";
import { verifyToken } from "../Middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken, GetPayment)
router.post('/', verifyToken, CreatePayment)
router.post('/hostel', verifyToken, GetPaymentByHostel)
router.post('/verify', verifyToken, VerifyPayment)

export default router