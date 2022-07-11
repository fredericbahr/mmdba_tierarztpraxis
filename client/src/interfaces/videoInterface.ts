import { ITreatment } from "./treatmentInterface";

export interface IVideo {
  id: number;
  description: string;
  blob: Blob;
  treatment?: ITreatment;
  treatmendId?: number;
}
