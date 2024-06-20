import axios from "@/lib/axios";
import { AxiosError } from "axios";

export const getProjectsSummary = async () => {
    try {
        const response = await axios.get(`/reports/projects`);
        return response;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 

export const getCustomersSummary = async () => {
    try {
        const response = await axios.get(`/reports/customers`);
        return response;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 


export const getFinancesSummary = async () => {
    try {
        const response = await axios.get(`/reports/finances`);
        return response;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 


export const getDutiesSummary = async () => {
    try {
        const response = await axios.get(`/reports/duties`);
        return response;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 