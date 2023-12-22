import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { Project, projectTypes } from "./types";


export const getProjects = (page: number = 1, customerId: number | null = null) => async (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.GET_PROJECTS_REQUEST });
    try {
        let query = `/projects?pageNumber=${page}`;
        if (customerId) {
            query += `&customerId=${customerId}`;
        }
        const response = await axios.get(query);
        dispatch({ type: projectTypes.GET_PROJECTS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: projectTypes.GET_PROJECTS_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: projectTypes.GET_PROJECTS_FAILURE, payload: error.message });
        }
    }
}

export const getProject = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.GET_PROJECT_REQUEST });
    try {
        const response = await axios.get(`/projects/${id}`);
        dispatch({ type: projectTypes.GET_PROJECT_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: projectTypes.GET_PROJECT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: projectTypes.GET_PROJECT_FAILURE, payload: error.message });
        }
    }
}

export const createProject = (project: Project) => async (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.CREATE_PROJECT_REQUEST });
    try {
        const result = await axios.post('/projects', project);
        const response = project;
        response.id = result.data;
        dispatch({ type: projectTypes.CREATE_PROJECT_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: projectTypes.CREATE_PROJECT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: projectTypes.CREATE_PROJECT_FAILURE, payload: error.message });
        }
    }
}

export const updateProject = (id: number, project: Project) => async (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.UPDATE_PROJECT_REQUEST });
    try {
        await axios.put(`/projects/${id}`, project);
        dispatch({ type: projectTypes.UPDATE_PROJECT_SUCCESS, payload: project });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: projectTypes.UPDATE_PROJECT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: projectTypes.UPDATE_PROJECT_FAILURE, payload: error.message });
        }
    }
}

export const deleteProject = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.DELETE_PROJECT_REQUEST });
    try {
        await axios.delete(`/projects/${id}`);
        dispatch({ type: projectTypes.DELETE_PROJECT_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: projectTypes.DELETE_PROJECT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: projectTypes.DELETE_PROJECT_FAILURE, payload: error.message });
        }
    }
}

export const resetProjectStatus = () => (dispatch: Dispatch) => {
    dispatch({ type: projectTypes.RESET_PROJECT_STATUS });
}