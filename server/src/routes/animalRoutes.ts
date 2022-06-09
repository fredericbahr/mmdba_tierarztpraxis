import express from "express";
import { getCustomers } from "../controllers/customerController";

const animalRouter = express.Router();

animalRouter.post("/animal", createAnimal);

export default animalRouter;
