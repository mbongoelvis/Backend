import express from 'express';
import { doctorOTP, patientOTP } from '../controllers/otp.js';

const router = express.Router();

// otp route for the patient
router.post("/patient", patientOTP);
// otp route for the doctor
router.post("/dcotor", doctorOTP);

export default router;