import axios from "@/lib/axios";
import { AxiosError } from "axios";

export const getProjectsSummary = async () => {
    try {
        const response = await axios.get(`/reports/projects-summary`);
        return response;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 