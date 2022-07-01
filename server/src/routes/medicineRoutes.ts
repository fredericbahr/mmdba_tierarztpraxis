import express from "express";
import {
  createMedicine,
  getMedicines,
} from "../controllers/medicineController";
import multer, { StorageEngine } from "multer";

const medicineRouter = express.Router();

const storage: StorageEngine = multer.memoryStorage();
const formData = multer({ storage });

medicineRouter.post(
  "/medicine",
  formData.single("medicine-files"),
  createMedicine
);

medicineRouter.get("/medicines", getMedicines);

export default medicineRouter;
