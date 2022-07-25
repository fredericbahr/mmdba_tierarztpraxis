import express from "express";
import multer, { StorageEngine } from "multer";
import {
  createTreatment,
  deleteTreatment,
  getLatestTreatments,
  getTreatments,
  handleTreatmentSearch,
} from "../controllers/treatmentController";

const treatmentRouter = express.Router();

const storage: StorageEngine = multer.memoryStorage();
const formData = multer({ storage });

treatmentRouter.get("/treatments", getTreatments);

treatmentRouter.get("/treatments/latest/:limit?", getLatestTreatments);

treatmentRouter.post(
  "/treatment",
  formData.array("treatment-files"),
  createTreatment
);

treatmentRouter.post("/treatment/search", handleTreatmentSearch);

treatmentRouter.delete("/treatment/:id", deleteTreatment);

export default treatmentRouter;

