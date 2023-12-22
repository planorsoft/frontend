import { CustomerState } from "./types";

export const selectCustomerById = (customerState: CustomerState, id: number) => {
    return customerState.customers.find(customer => customer.id === id);
}