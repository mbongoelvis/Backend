import express from 'express';
import { DoctorUpdateBooking, patientBooking, patientUpdateBooking, createBooking, deleteBooking, allBooking, doctorBooking } from '../controllers/booking.js';

const bookingRouter = express.Router();

// create booking
bookingRouter.post("/", createBooking);

// delete booking
bookingRouter.delete("/:id", deleteBooking);

// doctor update booking
bookingRouter.put("/:id", DoctorUpdateBooking);

// patient update booking
bookingRouter.put("/:id", patientUpdateBooking);

// all booking
bookingRouter.get("/", allBooking);

// patient update booking
bookingRouter.get("/:id", patientBooking);

// doctor update booking
bookingRouter.get("/:id", doctorBooking);


export default bookingRouter;