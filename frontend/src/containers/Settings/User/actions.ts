import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { UpdateCurrentUserCommand } from "./types";


export const getCurrentUser = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_MY_USER_REQUEST' });
    try {
        const { data } = await axios.get('/users/me');
        dispatch({ type: 'GET_MY_USER_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'GET_MY_USER_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'GET_MY_USER_FAILURE', payload: error.message });
        }
    }
}

export const updateCurrentUser = (data: UpdateCurrentUserCommand) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_MY_USER_REQUEST' });
    try {
        await axios.post(`/users/me`, data);
        dispatch({ type: 'UPDATE_MY_USER_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'UPDATE_MY_USER_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'UPDATE_MY_USER_FAILURE', payload: error.message });
        }
    }
}

export const updateCurrentUserAvatar = (file: File) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_AVATAR_REQUEST' });
    try {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post(`/users/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({ type: 'UPDATE_AVATAR_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'UPDATE_AVATAR_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'UPDATE_AVATAR_FAILURE', payload: error.message });
        }
    }
}

export const deleteCurrentUserAvatar = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_AVATAR_REQUEST' });
    try {
        await axios.delete(`/users/image`);
        dispatch({ type: 'DELETE_AVATAR_SUCCESS' });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: 'DELETE_AVATAR_FAILURE', payload: error.response.data.detail });
        } else {
            dispatch({ type: 'DELETE_AVATAR_FAILURE', payload: error.message });
        }
    }
}