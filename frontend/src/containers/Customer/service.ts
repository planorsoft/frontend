import axios from "@/lib/axios";
import { CustomerDelete, CustomerUpsert } from "./types";

export const createCustomer = async (data: CustomerUpsert) => {
    const response = await axios.post("/customers", data);
    return response.data;
}

export const updateCustomer = async (id: string, data: CustomerUpsert) => {
    const response = await axios.put(`/customers/${id}`, data);
    return response.data;
}

export const deleteCustomer = async (id: CustomerDelete) => {
    const response = await axios.delete(`/customers/${id}`);
    return response.data;
}

export const getCustomer = async (id: string) => {
    const response = await axios.get(`/customers/${id}`);
    return response.data;
}