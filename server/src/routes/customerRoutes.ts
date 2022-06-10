import express from "express";
import { getCustomers, handleCustomerCreate } from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/customers", getCustomers);

customerRouter.post("/customer", handleCustomerCreate);

export default customerRouter;
