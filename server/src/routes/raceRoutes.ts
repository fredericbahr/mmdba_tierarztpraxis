import express from "express";
import { getRaces, handleRaceCreation } from "../controllers/raceController";

const raceRouter = express.Router();

raceRouter.get("/races/:speciesId", getRaces);

raceRouter.post("/race", handleRaceCreation);

export default raceRouter;
