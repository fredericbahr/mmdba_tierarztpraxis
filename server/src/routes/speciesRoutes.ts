import express from "express";
import {
  getSpecies,
  handleSpeciesCreation,
} from "../controllers/speciesController";

const speciesRouter = express.Router();

speciesRouter.get("/species", getSpecies);

speciesRouter.post("/species", handleSpeciesCreation);

export default speciesRouter;
