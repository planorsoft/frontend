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
        if (error.response) {
            dispatch({ type: 'GET_CURRENCIES_FAILURE', payload: error.response?.data.title });
        } else {
            dispatch({ type: 'GET_CURRENCIES_FAILURE', payload: error.message });
        }
    }
}

export const getCurrency = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CURRENCY_REQUEST' });
    try {
        const response = await axios.get(`/currencies/${id}`);
        dispatch({ type: 'GET_CURRENCY_SUCCESS', payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: 'GET_CURRENCY_FAILURE', payload: error.response?.data.detail });
        } else {
            dispatch({ type: 'GET_CURRENCY_FAILURE', payload: error.message });
        }
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
        if (error.response) {
            dispatch({ type: 'CREATE_CURRENCY_FAILURE', payload: error.response?.data.detail });
        } else {
            dispatch({ type: 'CREATE_CURRENCY_FAILURE', payload: error.message });
        }
    }
}

export const updateCurrency = (id: number, data: Currency) => async (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_CURRENCY_REQUEST' });
    try {
        await axios.put(`/currencies/${id}`, data);
        dispatch({ type: 'UPDATE_CURRENCY_SUCCESS', payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        console.log(error.response);
        if (error.response) {
            dispatch({ type: 'UPDATE_CURRENCY_FAILURE', payload: error.response?.data.detail });
        } else {
            dispatch({ type: 'UPDATE_CURRENCY_FAILURE', payload: error.message });
        }
    }
}

export const deleteCurrency = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_CURRENCY_REQUEST' });
    try {
        await axios.delete(`/currencies/${id}`);
        dispatch({ type: 'DELETE_CURRENCY_SUCCESS', payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: 'DELETE_CURRENCY_FAILURE', payload: error.response?.data.detail });
        } else {
            dispatch({ type: 'DELETE_CURRENCY_FAILURE', payload: error.message });
        }
    }
}

export const resetCurrencyStatus = () => (dispatch: Dispatch) => {
    dispatch({ type: 'RESET_CURRENCY_STATUS' });
}

