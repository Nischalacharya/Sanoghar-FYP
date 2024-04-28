import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    startingDate: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
    ,
    room: {
        type: Object,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;