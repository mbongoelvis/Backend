import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
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
    workingDays: {
      type: String,
    },
    workingTime: {
      type: String,
    },
    wordkingExperience: {
      type: String,
    },
    experience: {
      type: String,
    },
    cv: {
      type: String,
    },
    speciality: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://as1.ftcdn.net/v2/jpg/02/32/71/62/1000_F_232716200_xTsnomMS5djsC6m9cDNQmEKtPgt11Xjo.jpg"
    },
    isDoctor: {
      type: Boolean,
      default: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("doctorSchema", doctorSchema);
