import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { Currency } from "./types";

export const getCurrencies = () => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CURRENCIES_REQUEST' });
    try {
        const response = await axios.get('/currencies');
        dispatch({ type: 'GET_CURRENCIES_SUCCESS', payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'GET_CURRENCIES_FAILURE', payload: error.response?.data.title });
    }
}

export const getCurrency = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CURRENCY_REQUEST' });
    try {
        const response = await axios.get(`/currencies/${id}`);
        dispatch({ type: 'GET_CURRENCY_SUCCESS', payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'GET_CURRENCY_FAILURE', payload: error.response?.data.title });
    }
}

export const createCurrency = (data: Currency) => async (dispatch: Dispatch) => {
    dispatch({ type: 'CREATE_CURRENCY_REQUEST' });
    try {
        const result = await axios.post('/currencies', data);
        const response = data;
        response.id = result.data;
        dispatch({ type: 'CREATE_CURRENCY_SUCCESS', payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'CREATE_CURRENCY_FAILURE', payload: error.message });
    }
}

export const updateCurrency = (id: number, data: Currency) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_CURRENCY_REQUEST' });
    try {
        await axios.put(`/currencies/${id}`, data);
        dispatch({ type: 'UPDATE_CURRENCY_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'UPDATE_CURRENCY_FAILURE', payload: error.message });
    }
}

export const deleteCurrency = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_CURRENCY_REQUEST' });
    try {
        await axios.delete(`/currencies/${id}`);
        dispatch({ type: 'DELETE_CURRENCY_SUCCESS', payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: 'DELETE_CURRENCY_FAILURE', payload: error.message });
    }
}

