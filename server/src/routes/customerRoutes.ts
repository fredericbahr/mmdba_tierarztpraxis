import express from "express";
import { getAllCustomers, getCustomerQuery, handleCustomerCreate } from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/customers", getAllCustomers);

customerRouter.get("/customer/data", getCustomerQuery);

customerRouter.post("/customer", handleCustomerCreate);

export default customerRouter;
