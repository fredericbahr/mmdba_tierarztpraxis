import express from "express";
import { getCustomers } from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/customers", getCustomers);

export default customerRouter;
