import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING).then(() => {
            console.log("Database connection established");
        })
    } catch (err) {
        console.log(err.message);
    }
}