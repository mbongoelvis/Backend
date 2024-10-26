import doctorSchema from "../model/doctor.js";
import booking from "../model/booking.js";
import bcrypt from "bcrypt";

// ------------------- login ----------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if the email or password was not sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    // find if the email exists
    const emailExist = await doctorSchema.findOne({ email });
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
    return res.status(200).json({ message: "Welcome back", data: emailExist });
  } catch (error) {
    console.log(error.message);
  }
};

// ---------------- signup ---------------------------
export const signup = async (req, res) => {
  try {
    const { email, password, firstname } = req.body;
    // checking if the email or password was not sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const checkingEmail = await doctorSchema.findOne({ email });
    if (checkingEmail) {
      return res
        .status(400)
        .json({ message: "email is already in use, use another email" });
    }
    // hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    //   saving the user into the database
    const saveUser = await new doctorSchema({
      email,
      firstname,
      password: hashPassword,
    }).save();
    //   checking if the user was not saved
    if (!saveUser) {
      return res.status(401).json({ message: "user not saved" });
    }
    return res.status(200).json({ message: "user saved", userID: saveUser._id });
  } catch (error) {
    console.log(error.message);
  }
};

// ----------------- accept booking -----------------
export const acceptBooking = async (req, res) => {
  const { bookingID } = req.params;
  // finding if the booking is in the database
  const findBooking = await booking.findOne({ bookingID });
  // if the booking those not exist
  if (!findBooking) {
    return res.status(400).json({ message: "booking not found" });
  }
  // find booking for that particular account
  const updateBooking = await booking.findOneAndUpdate(
    { bookingID },
    {
      $set: { isAccepted: true },
    }
  );
  // sending all the booking for that particular account
  return res.status(200).json({ message: "booking accepted" });
};

// ------------ decline booking -----------------------
export const declineBooking = async (req, res) => {
  const { bookingID } = req.params;
  // finding if the booking is in the database
  const findBooking = await booking.findOne({ bookingID });
  // if the booking those not exist
  if (!findBooking) {
    return res.status(400).json({ message: "booking not found" });
  }
  // find booking for that particular account
  const updateBooking = await booking.findOneAndUpdate({ bookingID }, {
    $set: { isDeclined: true}
  });
  // sending all the booking for that particular account
  return res
    .status(200)
    .json({ message: "booking declined"});
};

// -------------- get all doctors booking ---------------------------
export const getBooking = async (req, res) => {
  const { doctorID } = req.params
  // finding if the account is in the database
  const findAccount = await doctorSchema.findOne({ doctorID })
  // if the account those not exist
  if (!findAccount) {
    return res.status(400).json({ message: "Account not found" })
  }
  // find booking for that particular account
  const findBooking = await booking.find({doctorID})
  // sending all the booking for that particular account
  return res.status(200).json({ message: "all booking", bookings: findBooking });
};

// ------------ delete account ---------------
export const deleteAccount = async (req, res) => {
  const { doctorID } = req.params;
  // find the account to be deleted
  const findAccount = await doctorSchema.findOne({ doctorID });
  // if the account was not fund
  if (!findAccount) {
    return res.status(400).json({ message: "account not found" });
  }
  // deleting the account
  const deleteAccount = await doctorSchema.deleteOne({ doctorID });
  return res.status(200).json({ message: "account deleted" });
};

// ...........get doctor information ............
export const getUser = async (req, res) => {
  try {
    // getting the user if from
    const { userID } = req.param;
    const findAccount = await doctorSchema.findOne(
      { userID },
      { password: 0 }
    );
    if (!findAccount) {
      return res.status(400).json({ message: "Account not found" });
    }
    // if the account is found then we send it
    return res.status(200).json({ user: findAccount });
    // find the user account
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
