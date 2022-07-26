import express from "express";
import {
  getAllCustomers,
  getCustomerQuery,
  handleCustomerCreate,
  deleteCustomer,
  getLatestCustomers,
} from "../controllers/customerController";

const customerRouter = express.Router();

customerRouter.get("/customers", getAllCustomers);

customerRouter.get("/customer/data", getCustomerQuery);

customerRouter.get("/customers/latest/:amount?", getLatestCustomers);

customerRouter.delete("/customer/delete/:id", deleteCustomer);

customerRouter.post("/customer", handleCustomerCreate);

export default customerRouter;
