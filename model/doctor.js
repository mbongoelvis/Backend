import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      default: "firstname",
      type: String,
    },
    lastname: {
      default: "lastname",
      type: String,
    },
    DOB: {
      required: true,
      default: "20 July 1998",
      type: Date,
    },
    workingDays: {
      type: String,
      default: "Monday - Friday",
      required: true,
    },
    workingTime: {
      type: String,
      default: "12:00 - 6:00",
      required: true,
    },
    wordkingExperience: {
      type: String,
      default: "4 years +",
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("doctorSchema", doctorSchema);
