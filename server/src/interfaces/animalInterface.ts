import { IRaceCreateRequest } from "./raceInterfaces";

export interface ICreateAnimalRequest {
    name: string;
    birthdate: Date;
    weight: number;
    customerId: number;
    raceId: number;
}
export interface ISearchAnimalRequest {
    name: string;
    birthdate: Date;
    weight: number;
    customerId: number;
    raceId: number;
    speciesId: number;
}

export interface IAnimalConstructionSet {
    name: string;
    birthdate: Date;
    weight: number;
    owner: IOwner;
    race: IRace;
}

export interface IOwner {
    name: string;
}

export interface IRace {
    name: string;
}