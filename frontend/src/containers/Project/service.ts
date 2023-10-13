import axios from "@/lib/axios";
import { ProjectDelete, ProjectUpsert } from "./types";

export const createProject = async (data: ProjectUpsert) => {
    const response = await axios.post("/projects", data);
    return response.data;
}

export const updateProject = async (id: string, data: ProjectUpsert) => {
    const response = await axios.put(`/projects/${id}`, data);
    return response.data;
}

export const deleteProject = async (id : ProjectDelete) => {
    const response = await axios.delete(`/projects/${id}`);
    return response.data;
}