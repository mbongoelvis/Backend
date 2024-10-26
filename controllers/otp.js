import doctorSchema from "../model/doctor.js";
import patientSchema from "../model/patient.js";

// router to verify the ot
export const patientOTP = async (req, res) => {
    try {
        const { otp, creator } = req.body;
    // now we need to check who is verifying
  } catch (error) {
    console.log(error.message);
    return;
  }
};

// router to verify the ot
export const doctorOTP = async (req, res) => {
  try {
    // now we need to check who is verifying
  } catch (error) {
    console.log(error.message);
    return;
  }
};