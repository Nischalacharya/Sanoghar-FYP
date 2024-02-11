import Payment from "../model/Payment.js";
import stripe from "stripe";

const Stripe = stripe(
  "sk_test_51OhkzYEE46R4eqNzGv8rBKx239kfmEqhmFQCjnSENUojhw5wcRvO2clghPC2JcaQnjncr2lTPxn6KFGxXaWHSE7P00CltTd6v7"
);

export const GetPayment = async (req, res) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetPaymentByHostel = async (req, res) => {
  try {
    const res = await Payment.find({ hostel: req.body.hostel });
    res.status(200).json(res);
  } catch (error) {
    res.status(404).json(false);
  }
};

export const VerifyPayment = async (req, res) => {
  try {
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: req.body.hostel,
            },
            unit_amount: req.body.price,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/hosteldetail/success`,
      cancel_url: `http://localhost:5173/hosteldetail`,
    });

    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const CreatePayment = async (req, res) => {
  try {
    const newPayment = new Payment({
      hostel: req.body.hostel,
      price: req.body.price,
      email: req.body.email,
    });

    await newPayment.save();
    res.status(200).json(newPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
