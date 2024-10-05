import express from 'express';
import { allBookings, login, create } from '../controllers/admin.js';

const adminRouter = express.Router();

// declearing all the routes
adminRouter.post("/login", login)
// create other admin
adminRouter.post("/create", create);
// declearing all the routes
adminRouter.get("/allbooking", allBookings)

export default adminRouter;