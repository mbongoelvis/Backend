import doctorSchema from "../model/doctor.js";
import patientSchema from "../model/patient.js";
import otpSchema from "../model/otp.js";
import bcrypt from "bcrypt";
import { createOpt } from "../middelware/createOpt.js";


// ----------- login ------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if the email or password was not sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    // find if the email exists
    const emailExist = await patientSchema.findOne({ email });
    if (!emailExist) {
      return res.status(400).json({ message: "account not found" });
    }

    // comparing passwords using bcrypt
    const comparingPasswords = await bcrypt.compare(
      password,
      emailExist.password
    );
    //   sending wrong cridential
    if (!comparingPasswords) {
      return res.status(401).json({
        message: "Wrong cridentials",
      });
    }
    // login if evrything is ok
    return res.status(200).json({ message: "Welcome back", userId: emailExist._id });
    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ----------- signup ------------
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if the email or password was not sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    // find if the email exists
    const emailExist = await doctorSchema.findOne({ email });
    const emailPatient = await patientSchema.findOne({ email });
    // if the email have been used either by the doctor or patient
    if (emailExist || emailPatient) {
      return res.status(400).json({ message: "account already in use" });
    }
    // hashing the password
    const hashPasswords = await bcrypt.hash(password, 10);
    //   saving the account
    const savePatient = await new patientSchema({
      password: hashPasswords,
      email,
    }).save();
    //   if the user was saved
    if (!savePatient) {
      return res.status(200).json({ message: "user not saved" });
    }

    // creating the otp for the patient to verify
    const creatOtp = await new otpSchema({
      creatorId: savePatient._id,
      otp: createOpt(),
    }).save();

    // login if evrything is ok
    return res
      .status(200)
      .json({ message: "account created successfully", id: savePatient._id});
  } catch (error) {
    console.log(error.message);
  }
};

// ----------- update account ------------
export const updateAccount = async (req, res) => {
  try {
    const { userID } = req.params;
    // neccessary data to update
    const {firstName, lastName, location, DOB, address, avatar, medicalRecord, gender, occupation, phoneNumber } = req.body;
    // finding if the account already exist
    const findAccount = await patientSchema.findOne({ userID });
    if (!findAccount) {
      return res.status(400).json({ message: "Account not found" });
    }
    // find the account and update
    const updateAcccount = await patientSchema.findOneAndUpdate(
      { userID },
      {
        $set: {
          firstName,
          firstName,
          lastName,
          location,
          DOB,
          address,
          avatar,
          medicalRecord,
          gender,
          occupation,
          phoneNumber,
        },
      }
    );
    // if everything not good
    if (!updateAcccount) {
      return res.status(400).json({ message: "account not updated" });
    }
    // if everything good
    return res.status(200).json({ message: "account updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// ----------- delete account ------------
export const deleteAccount = async (req, res) => {
  try {
    const { userID } = req.param;
    // checking if the account exist
    const findAccount = await patientSchema.findOne({ userID });
    if (!findAccount) {
      return res.status(400).json({ message: "Account not found" });
    }
    // find the account and delete
    const updateAcccount = await patientSchema.findOneAndUpdate({ userID });
    // if everything not good
    if (updateAcccount) {
      return res.status(400).json({ message: "account deleted" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ............. get a user info .............
export const getUser = async (req, res) => { 
  try {
    // getting the user if from 
    const { userID } = req.param;
    const findAccount = await patientSchema.findOne({ userID }, { password: 0});
    if (!findAccount) {
      return res.status(400).json({ message: "Account not found" });
    }
    // if the account is found then we send it
    return res.status(200).json({user: findAccount})
    // find the user account
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

