import express from "express";
import {
  createAnimal,
  getAnimals,
  getAnimalQuery,
  getAnimalsForCustomer,
  deleteAnimal,
  getLatestAnimals,
} from "../controllers/animalController";

const animalRouter = express.Router();

animalRouter.get("/animal", getAnimals);

animalRouter.get("/animal/data", getAnimalQuery);

animalRouter.get("/animals", getAnimals);

animalRouter.get("/animals/latest/:amount?", getLatestAnimals);

animalRouter.get("/animals/:customerId", getAnimalsForCustomer);

animalRouter.post("/animal", createAnimal);

animalRouter.delete("/animal/delete/:id", deleteAnimal);

export default animalRouter;
