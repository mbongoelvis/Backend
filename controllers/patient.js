import doctorSchema from "../model/doctor.js";
import patientSchema from "../model/patient.js";
import bcrypt from "bcrypt";

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
    console.log(req.body);
    return res.status(200).json({ message: "Welcome back", data: emailExist });
    
  } catch (error) {
    console.log(error.message);
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
    // login if evrything is ok
    return res.status(200).json({ message: "account created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// ----------- update account ------------
export const updateAccount = async (req, res) => {
  try {
    const { userID } = req.params;
    // finding if the account already exist
    const findAccount = await patientSchema.findOne({ userID });
    if (!findAccount) {
      return res.status(400).json({ message: "Account not found" });
    }
    // find the account and update
    const updateAcccount = await patientSchema.findOneAndUpdate(
      { userID },
      { $set: req.body }
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

