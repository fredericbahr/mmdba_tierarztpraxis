import { ICustomer } from "./customerInterface";
import { IRace } from "./raceInterface";
import { ITreatment } from "./treatmentInterface";

export interface IAnimal {
  id: number;
  name: string;
  birthdate: Date;
  weight: number;
  owner?: ICustomer;
  customerId?: number;
  race?: IRace;
  raceId?: number;
  treatements?: ITreatment[];
}

export interface IOwner {
  name: string;
}
