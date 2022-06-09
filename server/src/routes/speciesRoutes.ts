import express from "express";
import { getSpecies } from "../controllers/speciesController";

const speciesRouter = express.Router();

speciesRouter.get("/species", getSpecies);

export default speciesRouter;
