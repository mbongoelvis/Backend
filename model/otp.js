import mongoose from "mongoose";

// creatig the schema for otp
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now() * 3000
    }
})

export default mongoose.model("opt", otpSchema);