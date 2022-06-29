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
