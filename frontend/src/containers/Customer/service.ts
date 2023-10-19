import axios from "@/lib/axios";
import { Customer } from "./types";

export const createCustomer = async ({
    id,
    name,
    isCompany,
    address,
    city,
    district,
    postCode,
    country,
    phoneNumber,
    website,
    governmentId,
    currencyCode,
    isPotantial
}: Customer) => {
    const response = await axios.post("/customers", {
        id,
        name,
        isCompany,
        address,
        city,
        district,
        postCode,
        country,
        phoneNumber,
        website,
        governmentId,
        currencyCode,
        isPotantial
    });
    return response.data;
}

export const updateCustomer = async (id: number, data: Customer) => {
    const response = await axios.put(`/customers/${id}`, data);
    return response.data;
}

export const deleteCustomer = async (id: number) => {
    const response = await axios.delete(`/customers/${id}`);
    return response.data;
}

export const getCustomer = async (id: number) => {
    const response = await axios.get(`/customers/${id}`);
    return response.data;
}