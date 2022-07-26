import { IAnimal } from "./animalInterface";
import { ISpecies } from "./speciesInterface";

export interface IRace {
  name: string;
  species?: ISpecies;
  speciesId?: number;
  animal?: IAnimal;
}
