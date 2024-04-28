import Hostel from "../model/Hostel.js";
import Payment from "../model/Payment.js";
import { Stripe } from "stripe";
import nodemailer from "nodemailer";
const stripe = Stripe(
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
        const payment = await Payment.find({
            hostel: req.body.hostel,
            email: req.body.email,
        });
        res.status(200).json(payment.length > 0 ? true : false);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

export const VerifyPayment = async (req, res) => {
    const { room, duration } = req.body;
    try {
        const lineItems = [];
        for (const floorIndex in room) {
            for (const roomName in room[floorIndex]) {
                const roomDetails = room[floorIndex][roomName];
                lineItems.push({
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Floor ${floorIndex} - ${roomName} Seater`,
                        },
                        unit_amount: parseInt(roomDetails.price),
                    },
                    quantity: duration,
                });
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: lineItems,
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
            startingDate: req.body.startingDate,
            duration: req.body.duration,
            room: req.body.room,
            ownerEmail: req.body.ownerEmail,
            email: req.body.email,
            totalPrice: req.body.totalPrice,
        });

        await sendPaymentEmail(req.body, res);
        await newPayment.save();

        let hostel = await Hostel.findOne({ title: req.body.hostel });
        hostel = filterHostel(req.body.room, hostel);
        await Hostel.findByIdAndUpdate(hostel._id, {
            ...hostel
        });

        res.status(200).json({ success: true, hostel: hostel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const filterHostel = (room1, hostel) => {
    Object.keys(room1).map(floorIndex => {
        Object.keys(room1?.[floorIndex]).map(roomIndex => {
            delete hostel?.floor?.[floorIndex]?.[roomIndex];
        })
    });
    return hostel;
}
const sendPaymentEmail = async (data, res) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.mailer_gmail,
                pass: process.env.app_code,
            },
        });

        let mailOptions = {
            from: {
                name: "Sanoghar",
                address: "Sanoghar@gmail.com",
            },
            to: data.email,
            subject: "Hostel Booked",
            text: `Your Hostel has been booked. Total Price is Rs.${data.totalPrice}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return true;
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendPaymentReminderEmail = async (data) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.mailer_gmail,
                pass: process.env.app_code,
            },
        });

        let mailOptions = {
            from: {
                name: "Sanoghar",
                address: "Sanoghar@gmail.com",
            },
            to: data.email,
            subject: "Payment Reminder",
            text: `Dear ${data.name},\n\nYour hostel booking is about to expire in ${data.days} Days .Please ensure your payment is completed soon to avoid any inconvenience.\n\nThank you,\nSanoghar Team`,
        };

        transporter.sendMail(mailOptions, function (error, info) { });
    } catch (error) { }
};
