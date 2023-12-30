import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { Finance, FinanceCategory, financeTypes } from "./types";

export const getFinances = (isIncome: boolean, page: number = 1) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.GET_FINANCES_REQUEST });
    try {
        const response = await axios.get(`/finances?pageNumber=${page}&isIncome=${isIncome}`);
        dispatch({ type: financeTypes.GET_FINANCES_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: financeTypes.GET_FINANCES_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: financeTypes.GET_FINANCES_FAILURE, payload: error.message });
        }
    }
}


export const getFinance = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.GET_FINANCE_REQUEST });
    try {
        const response = await axios.get(`/finances/${id}`);
        dispatch({ type: financeTypes.GET_FINANCE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: financeTypes.GET_FINANCE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: financeTypes.GET_FINANCE_FAILURE, payload: error.message });
        }
    }
}

export const createFinance = (finance: Finance) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.CREATE_FINANCE_REQUEST });
    try {
        const result = await axios.post('/finances', finance);
        const response = finance;
        response.id = result.data;
        dispatch({ type: financeTypes.CREATE_FINANCE_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: financeTypes.CREATE_FINANCE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: financeTypes.CREATE_FINANCE_FAILURE, payload: error.message });
        }
    }
}

export const updateFinance = (id: number, finance: Finance) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.UPDATE_FINANCE_REQUEST });
    try {
        await axios.put(`/finances/${id}`, finance);
        dispatch({ type: financeTypes.UPDATE_FINANCE_SUCCESS, payload: finance });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: financeTypes.UPDATE_FINANCE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: financeTypes.UPDATE_FINANCE_FAILURE, payload: error.message });
        }
    }
}

export const deleteFinance = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.DELETE_FINANCE_REQUEST });
    try {
        await axios.delete(`/finances/${id}`);
        dispatch({ type: financeTypes.DELETE_FINANCE_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: financeTypes.DELETE_FINANCE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: financeTypes.DELETE_FINANCE_FAILURE, payload: error.message });
        }
    }
}

export const getFinanceCategories = () => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.GET_FINANCE_CATEGORIES_REQUEST });
    try {
        const response = await axios.get('/finance/categories');
        dispatch({ type: financeTypes.GET_FINANCE_CATEGORIES_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: financeTypes.GET_FINANCE_CATEGORIES_FAILURE, payload: error.message });
    }
}

export const getFinanceCategory = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.GET_FINANCE_CATEGORY_REQUEST });
    try {
        const response = await axios.get(`/finance/categories/${id}`);
        dispatch({ type: financeTypes.GET_FINANCE_CATEGORY_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: financeTypes.GET_FINANCE_CATEGORY_FAILURE, payload: error.message });
    }
}

export const createFinanceCategory = (category: FinanceCategory) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.CREATE_FINANCE_CATEGORY_REQUEST });
    try {
        const result = await axios.post('/finance/categories', category);
        const response = category;
        response.id = result.data;
        dispatch({ type: financeTypes.CREATE_FINANCE_CATEGORY_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: financeTypes.CREATE_FINANCE_CATEGORY_FAILURE, payload: error.message });
    }
}

export const updateFinanceCategory = (id: number, category: FinanceCategory) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.UPDATE_FINANCE_CATEGORY_REQUEST });
    try {
        await axios.put(`/finance/categories/${id}`, category);
        dispatch({ type: financeTypes.UPDATE_FINANCE_CATEGORY_SUCCESS, payload: category });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: financeTypes.UPDATE_FINANCE_CATEGORY_FAILURE, payload: error.message });
    }
}

export const deleteFinanceCategory = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.DELETE_FINANCE_CATEGORY_REQUEST });
    try {
        await axios.delete(`/finance/categories/${id}`);
        dispatch({ type: financeTypes.DELETE_FINANCE_CATEGORY_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: financeTypes.DELETE_FINANCE_CATEGORY_FAILURE, payload: error.message });
    }
}

export const resetFinanceStatus = () => (dispatch: Dispatch) => {
    dispatch({ type: financeTypes.RESET_FINANCE_STATUS });
}