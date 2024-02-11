import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    mobilenumber: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        default: "false"
    },
    isHostelOwner: {
        type: String,
        default: "false"
    }
})
const User = new mongoose.model("User", userSchema);
export default User;