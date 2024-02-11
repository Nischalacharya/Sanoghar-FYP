import express from "express";
import { CreatePayment, VerifyPayment, GetPayment, GetPaymentByHostel } from "../controller/Payment.js";

const router = express.Router();

router.get('/', GetPayment)
router.post('/', CreatePayment)
router.post('/hostel', GetPaymentByHostel)
router.post('/verify', VerifyPayment)

export default router