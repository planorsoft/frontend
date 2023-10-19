import axios from "@/lib/axios";
import { Project } from "./types";

export const createProject = async (data: Project) => {
    const response = await axios.post("/projects", data);
    return response.data;
}

export const getProject = async (id: number) => {
    const response = await axios.get(`/projects/${id}`);
    return response.data;
}

export const updateProject = async (id: number, data: Project) => {
    const response = await axios.put(`/projects/${id}`, data);
    return response.data;
}

export const deleteProject = async (id : number) => {
    const response = await axios.delete(`/projects/${id}`);
    return response.data;
}