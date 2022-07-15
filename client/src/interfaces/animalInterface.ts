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
  
  export interface IRace {
    name: string;
  }
  export interface IAnimalAdvancedSearchKeyword {
    keyword: string;
    operator: ISearchOperator | undefined;
  }
  
  export type ISearchOperator = "&" | "|" | "<->";
  
  export type ISearchTarget = "name" | "birthdate" | "weight" | "owner" | "species" | "race";
  