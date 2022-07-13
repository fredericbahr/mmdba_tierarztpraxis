export interface IPhoto {
  id: number;
  description: string;
  blob: Buffer;
  treatment?: number;
  treatmentId?: number;
}
