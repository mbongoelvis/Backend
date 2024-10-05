import mongoose, { Schema } from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  bookerID: {
    type: Schema.Types.ObjectId,
    ref: "patientSchema",
    required: true,
  },
  bookedDoctorId: {
    type: Schema.Types.ObjectId,
    ref: "doctorSchema",
    required: true,
  },
  isPending: {
      type: Boolean
  },
  isDeclined: {
      type: Boolean
  },
  isAccepted: {
      type: Boolean
    },
    comment: {
      type: String,
  }
});

export default mongoose.model("bookingSchema", bookingSchema);