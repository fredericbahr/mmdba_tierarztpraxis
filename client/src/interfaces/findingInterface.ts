import { ITreatment } from "./treatmentInterface";

export interface IFinding {
  id: number;
  description: string;
  content: string;
  blob: Buffer;
  treatment?: ITreatment;
  treatmendId?: number;
}
