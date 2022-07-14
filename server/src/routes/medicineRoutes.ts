import express from "express";
import {
  createMedicine,
  getLatestMedicines,
  getMedicines,
  handleAdvancedMedicineDescriptionSearch,
  handleAdvancedMedicineNameSearch,
  handleMedicineDelete,
  handleMedicineNameSearch,
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

medicineRouter.get("/medicines/latest/:amount?", getLatestMedicines);

medicineRouter.post("/medicine/search", handleMedicineNameSearch);
medicineRouter.post(
  "/medicine/search/advanced/name",
  handleAdvancedMedicineNameSearch
);
medicineRouter.post(
  "/medicine/search/advanced/description",
  handleAdvancedMedicineDescriptionSearch
);

medicineRouter.delete("/medicine/:id", handleMedicineDelete);

export default medicineRouter;
