import { ITreatment } from "./treatmentInterface";

export interface IVideo {
  id: number;
  description: string;
  blob: Buffer;
  treatment?: ITreatment;
  treatmendId?: number;
}
