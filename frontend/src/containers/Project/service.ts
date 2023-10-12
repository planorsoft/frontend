import axios from "@/lib/axios";
import { ProjectDelete, ProjectUpsert } from "./types";

export const createCustomer = async (data: ProjectUpsert) => {
    const response = await axios.post("/customers", data);
    return response.data;
}

export const updateCustomer = async (id: string, data: ProjectUpsert) => {
    const response = await axios.put(`/customers/${id}`, data);
    return response.data;
}

export const deleteCustomer = async (id : ProjectDelete) => {
    const response = await axios.delete(`/customers/${id}`);
    return response.data;
}