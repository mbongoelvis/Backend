import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./dbConnection.js";
import patientRouter from "./router/patient.js";
import adminRouter from "./router/admin.js";
import doctorRouter from "./router/doctor.js";
import bookingRouter from "./router/booking.js";
import otp from "./router/otp.js";
import { createOpt } from "./middelware/createOpt.js";

// invoking dotenv variables
dotenv.config();

// declearing the port of the server
const port = process.env.PORT || 4000

// declearing our server
const app = express();

// invoking all dependencies
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json())

// delcelaring all routes
app.use("/api/doctor", doctorRouter)
app.use("/api/patient", patientRouter);
app.use("/api/admin", adminRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/otp", otp);


// making the server
app.listen(port, () => {
    console.log(`server is running on ${port}`);
    connectDB()
})
