import express from "express";
import { getAllCustomers, getCustomerQuery, handleCustomerCreate, deleteCustomer } from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/customers", getAllCustomers);

customerRouter.get("/customer/data", getCustomerQuery);

customerRouter.delete("/customer/delete/:id", deleteCustomer);

customerRouter.post("/customer", handleCustomerCreate);

export default customerRouter;
