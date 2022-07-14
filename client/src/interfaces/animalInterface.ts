export interface IAnimals {
    id: number;
    name: string;
    birthdate: Date;
    weight: number;
    customer: number;
    species: string;
    race: string;
  }
  
  export interface IAnimalAdvancedSearchKeyword {
    keyword: string;
    operator: ISearchOperator | undefined;
  }
  
  export type ISearchOperator = "&" | "|" | "<->";
  
  export type ISearchTarget = "name" | "birthdate" | "weight" | "customer" | "species" | "race";
  