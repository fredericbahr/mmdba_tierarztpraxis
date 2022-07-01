import express from "express";
import multer, { StorageEngine } from "multer";
import { createTreatment, getTreatments } from "../controllers/treatmentController";

const treatmentRouter = express.Router();

const storage: StorageEngine = multer.memoryStorage();
const formData = multer({ storage });

treatmentRouter.get("/treatments", getTreatments);

treatmentRouter.post(
  "/treatment",
  formData.array("treatment-files"),
  createTreatment
);

export default treatmentRouter;
