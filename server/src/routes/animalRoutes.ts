import express from "express";
import { createAnimal } from "../controllers/animalController";

const animalRouter = express.Router();

animalRouter.post("/animal", createAnimal);

export default animalRouter;
