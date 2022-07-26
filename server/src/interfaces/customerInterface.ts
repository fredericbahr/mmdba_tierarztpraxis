export interface ICreateCustomerRequest {
    city: string;
    createdAt: Date;
    name: string;
    phoneNumber: string;
    plz: number;
    street: string;
}

export interface IDeleteCustomerRequest {
    id: number;
}
export interface ISearchCustomerRequest {
    city: string;
    createdAt: Date;
    name: string;
    phoneNumber: string;
    plz: number;
    street: string;
}