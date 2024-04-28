import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    floor: {
        type: Object,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    imagepath1: {
        type: String,
        required: false
    },
    imagepath2: {
        type: String,
        required: false
    },
    imagepath3: {
        type: String,
        required: false
    },
    latlng: {
        type: Object,
        required: true
    },
    isApprove: {
        type: String,
        default: "Pending",
        required: false
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Hostel = new mongoose.model("Hostel", HostelSchema);
export default Hostel;