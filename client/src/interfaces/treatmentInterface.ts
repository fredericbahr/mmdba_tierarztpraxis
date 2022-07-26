import { IAnimal } from "./animalInterface";
import { ICustomer } from "./customerInterface";
import { IFinding } from "./findingInterface";
import { IMedicine } from "./medicineInterface";
import { IPhoto } from "./photoInterface";
import { IVideo } from "./videoInterface";

export interface ITreatment {
  id: number;
  diagnosis: string;
  costs: number;
  date: Date;
  notes: string;
  animal?: IAnimal;
  customer?: ICustomer;
  medicines: IMedicine[];
  photos: IPhoto[];
  videos: IVideo[];
  findings: IFinding[];
}
