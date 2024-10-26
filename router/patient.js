import express from "express";
import {
  login,
  signup,
  updateAccount,
  deleteAccount,
  getUser
} from "../controllers/patient.js";

const patientRouter = express.Router();

// declearing all the routes
patientRouter.post("/login", login);

patientRouter.post("/signup", signup);

patientRouter.get("/getuser/:id", getUser);

patientRouter.patch("/updateaccount/:id", updateAccount);

patientRouter.delete("/deleteaccount/:id", deleteAccount);


export default patientRouter;
