import express from "express";
import { getRaces } from "../controllers/raceController";

const raceRouter = express.Router();

raceRouter.get("/races/:speciesId", getRaces);

export default raceRouter;
