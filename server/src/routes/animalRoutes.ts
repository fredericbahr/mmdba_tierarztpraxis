import express from "express";
import { createAnimal, getAnimals, getAnimalQuery, getAnimalsForCustomer } from "../controllers/animalController";

const animalRouter = express.Router();

animalRouter.get("/animal", getAnimals);

animalRouter.get("/animal/data", getAnimalQuery);

animalRouter.get("/animals", getAnimals);

animalRouter.get("/animals/:customerId", getAnimalsForCustomer);

animalRouter.post("/animal", createAnimal);

export default animalRouter;
