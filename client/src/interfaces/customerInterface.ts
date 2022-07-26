import { IAnimal } from "./animalInterface";
import { ITreatment } from "./treatmentInterface";

export interface ICustomer {
  id: number;
  name: string;
  street: string;
  plz: number;
  city: string;
  phoneNumber: string;
  animals: IAnimal[];
  treatments: ITreatment[];
}
