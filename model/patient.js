import mongoose, { Schema } from "mongoose";

const patientSchema = mongoose.Schema(
  {
    bookings: {
      type: Schema.Types.ObjectId,
      ref: "bookingSchema",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    location: {
      type: String,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

export default mongoose.model("patientSchema", patientSchema);
