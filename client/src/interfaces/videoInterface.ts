import { ITreatment } from "./treatmentInterface";

export interface IVideo {
  id: number;
  description: string;
  blob: Buffer;
  mimeType: string;
  treatment?: ITreatment;
  treatmendId?: number;
}
