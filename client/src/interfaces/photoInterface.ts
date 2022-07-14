export interface IPhoto {
  id: number;
  description: string;
  blob: Buffer;
  mimeType: string;
  treatment?: number;
  treatmentId?: number;
}
