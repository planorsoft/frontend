import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { User } from "./types";


export const getTeam = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_TEAM_REQUEST' });
    try {
        const { data } = await axios.get('/users/team');
        dispatch({ type: 'GET_TEAM_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'GET_TEAM_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'GET_TEAM_FAILURE', payload: error.message });
        }
    }
}

export const getUser = (email: string) => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_USER_REQUEST' });
    try {
        const { data } = await axios.get(`/users/${email}`);
        dispatch({ type: 'GET_USER_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'GET_USER_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'GET_USER_FAILURE', payload: error.message });
        }
    }
}

export const createUser = (user: User) => async (dispatch: Dispatch) => {
    dispatch({ type: 'CREATE_USER_REQUEST' });
    try {
        await axios.post('/users', user);
        user.roleName = "Employee";
        dispatch({ type: 'CREATE_USER_SUCCESS', payload: user });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'CREATE_USER_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'CREATE_USER_FAILURE', payload: error.message });
        }
    }
}

export const updateUser = (email: string, user: User) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_USER_REQUEST' });
    try {
        await axios.post(`/users/${email}`, user);
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: user });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
        }
    }
}

export const deleteUser = (email: string) => async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_USER_REQUEST' });
    try {
        await axios.delete(`/users/${email}`);
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: email });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: 'DELETE_USER_FAILURE', payload: error.response?.data.detail });
        } else {
            dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
        }
    }
}

export const resetTeamStatus = () => (dispatch: Dispatch) => {
    dispatch({ type: 'RESET_TEAM_STATUS' });
}