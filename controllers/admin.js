import admin from "../model/admin.js";
import bcrypt from "bcrypt";

export const create = async (req, res) => {
  const { password, email } = req.body;
  try {
    // checking if email and password are sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fileds are required" });
    }
    // if everything is good
    const checkingAccount = await admin.findOne({ email });
    //   checking is the account exist or not
    if (checkingAccount) {
      return res.status(400).json({ message: "account already exist" });
    }
    //  hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      //   creating and savivng the user
      const saveAdmin = await new admin({
          email,
          password: hashedPassword
      }).save()
      if (!saveAdmin) {
          return res.status(400).json({ message: "account not created" });
      }
    return res.status(200).json({ message: "account created" });
  } catch (error) {
    console.log(error.message);
  }
};

// login as admin
export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    // checking if email and password are sent
    if (!email || !password) {
      return res.status(400).json({ message: "all fileds are required" });
    }
    // if everything is good
    const checkingAccount = await admin.findOne({ email });
    //   checking is the account exist or not
    if (!checkingAccount) { 
      return res.status(400).json({ message: "account not found" });
    }
      //   checking the passwords
      const checkingPassword = await bcrypt.compare(password, checkingAccount.password);
    if (!checkingPassword) {
      return res.status(400).json({ message: "wrong cridential" });
    }
    return res.status(200).json({ message: "welcome back" });
  } catch (error) {
    console.log(error.message);
  }
};

// getting all the booking
export const allBookings = async (req, res) => {
  return res.status(200).json({ message: "end point to get all booking" });
};
