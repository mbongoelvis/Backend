import express from "express";
import { login, signup, acceptBooking, declineBooking, getBooking, deleteAccount } from "../controllers/doctor.js";

const doctorRouter = express.Router();

// declearing all the routes
doctorRouter.post("/login", login);

doctorRouter.post("/signup", signup);

doctorRouter.patch("/acceptbooking/:id", acceptBooking);

doctorRouter.patch("/declinebooking/:id", declineBooking);

doctorRouter.get("/mybooking/:id", getBooking);

doctorRouter.delete("/deleteaccount/:id", deleteAccount);

export default doctorRouter;