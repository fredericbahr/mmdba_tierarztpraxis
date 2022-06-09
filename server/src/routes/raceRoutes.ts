import express from "express";

const raceRouter = express.Router();

raceRouter.get("/customers", getRaces);

export default raceRouter;
