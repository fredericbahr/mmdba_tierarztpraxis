import { ITreatment } from "./treatmentInterface";

export interface IFinding {
  id: number;
  description: string;
  content: string;
  blob: Blob;
  treatment?: ITreatment;
  treatmendId?: number;
}
