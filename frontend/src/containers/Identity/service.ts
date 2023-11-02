import axios from "@/lib/axios";
import { AxiosError } from "axios";

export const getTenantByName = async (name: string) => {
    try {
        const { data, status } = await axios.get(`/tenants?name=${name}`);
        if (status === 200) {
            return data;
        }
        return null;
    } catch (error) {
        if (!(error instanceof AxiosError)) { throw error; }
        return null
    }
} 