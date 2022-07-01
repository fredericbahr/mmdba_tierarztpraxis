import express from "express";
import { createAnimal, getAnimals, getAnimalsForCustomer } from "../controllers/animalController";

const animalRouter = express.Router();

animalRouter.get("/animals", getAnimals);

animalRouter.get("/animals/:customerId", getAnimalsForCustomer);

animalRouter.post("/animal", createAnimal);

export default animalRouter;
