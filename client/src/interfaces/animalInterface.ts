import { ICustomer } from "./customerInterface";
import { IRace } from "./raceInterface";
import { ITreatment } from "./treatmentInterface";

export interface IAnimal {
  id: number;
  name: string;
  birthday: Date;
  weight: number;
  owner?: ICustomer;
  customerId?: number;
  race?: IRace;
  raceId?: number;
  treatements?: ITreatment[];
}

export interface IAnimals {
  id: number;
  name: string;
  birthdate: Date;
  weight: number;
  owner: IOwner;
  species: string;
  race: IRace;
}

export interface IOwner {
  name: string;
}