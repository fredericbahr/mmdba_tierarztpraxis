import { IRace } from "./raceInterface";

export interface ISpecies {
  id: number;
  name: string;
  races?: IRace[];
}
