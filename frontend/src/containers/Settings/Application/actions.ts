import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { Application } from "./types";
import { AxiosError } from "axios";


export const getCurrentApplication = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CURRENT_APPLICATION_REQUEST' });
    try {
        const response = await axios.get('/apps/current');
        dispatch({ type: 'GET_CURRENT_APPLICATION_SUCCESS', payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'GET_CURRENT_APPLICATION_FAILURE', payload: error.response?.data.title });
    }
}

export const createApplication = (data: Application) => async (dispatch: Dispatch) => {
    dispatch({ type: 'CREATE_APPLICATION_REQUEST' });
    try {
        await axios.post('/apps', data);
        dispatch({ type: 'CREATE_APPLICATION_SUCCESS' });
        dispatch(getCurrentApplication());
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'CREATE_APPLICATION_FAILURE', payload: error.message });
    }
}

export const updateApplication = (id: number, data: Application) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_APPLICATION_REQUEST' });
    try {
        await axios.put(`/apps/${id}`, data);
        dispatch({ type: 'UPDATE_APPLICATION_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'UPDATE_APPLICATION_FAILURE', payload: error.message });
    }
}

export const deleteApplication = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_APPLICATION_REQUEST' });
    try {
        await axios.delete(`/apps/${id}`);
        dispatch({ type: 'DELETE_APPLICATION_SUCCESS', payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'DELETE_APPLICATION_FAILURE', payload: error.message });
    }
}

export const setTitle = (title: string) => (dispatch: Dispatch) => {
    dispatch({ type: 'SET_TITLE', payload: title });
}