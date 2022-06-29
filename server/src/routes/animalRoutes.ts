import express from "express";
import { createAnimal, getAnimals, getAnimalQuery } from "../controllers/animalController";

const animalRouter = express.Router();

animalRouter.get("/animal", getAnimals);

animalRouter.get("/animal/data", getAnimalQuery);

animalRouter.post("/animal", createAnimal);

export default animalRouter;
