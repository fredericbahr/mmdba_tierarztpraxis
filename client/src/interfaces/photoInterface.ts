export interface IPhoto {
  id: number;
  description: string;
  blob: Blob;
  treatment?: number;
  treatmentId?: number;
}
