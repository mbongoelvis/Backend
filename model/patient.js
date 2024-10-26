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
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    DOB: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://as1.ftcdn.net/v2/jpg/02/32/71/62/1000_F_232716200_xTsnomMS5djsC6m9cDNQmEKtPgt11Xjo.jpg",
    },
    medicalRecord: {
      type: String,
    },
    gender: {
      type: String,
    },
    occupation: {
      type: String,
    },
    phoneNumber: {
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
