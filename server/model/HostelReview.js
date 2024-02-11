import mongoose from "mongoose";

const HostelReviwSchema = new mongoose.Schema({
    hostel: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const HostelReview = mongoose.model("HostelReview", HostelReviwSchema);

export default HostelReview;