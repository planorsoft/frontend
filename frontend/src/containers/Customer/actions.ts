import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { Contact, Customer, customerTypes } from "./types";
import { capitalizeEachWord } from "@/lib/utils";

export const getCustomers = (isPotential: boolean, page: number = 1) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.GET_CUSTOMERS_REQUEST });
    try {
        const response = await axios.get(`/customers?pageNumber=${page}&isPotential=${isPotential}`);
        dispatch({ type: customerTypes.GET_CUSTOMERS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.GET_CUSTOMERS_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: customerTypes.GET_CUSTOMERS_FAILURE, payload: error.message });
        }
    }
}

export const getCustomer = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.GET_CUSTOMER_REQUEST });
    try {
        const response = await axios.get(`/customers/${id}`);
        dispatch({ type: customerTypes.GET_CUSTOMER_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.GET_CUSTOMER_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.GET_CUSTOMER_FAILURE, payload: error.message });
        }
    }
}

export const createCustomer = (customer: Customer) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.CREATE_CUSTOMER_REQUEST });
    try {
        const result = await axios.post('/customers', customer);
        const response = customer;
        response.id = result.data;
        response.name = capitalizeEachWord(response.name);
        dispatch({ type: customerTypes.CREATE_CUSTOMER_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.CREATE_CUSTOMER_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.CREATE_CUSTOMER_FAILURE, payload: error.message });
        }
    }
}

export const updateCustomer = (id: number, customer: Customer) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.UPDATE_CUSTOMER_REQUEST });
    try {
        await axios.put(`/customers/${id}`, customer);
        customer.name = capitalizeEachWord(customer.name);
        dispatch({ type: customerTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        console.log(error.response);
        if (error.response) {
            dispatch({ type: customerTypes.UPDATE_CUSTOMER_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.UPDATE_CUSTOMER_FAILURE, payload: error.message });
        }
    }
}

export const deleteCustomer = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.DELETE_CUSTOMER_REQUEST });
    try {
        await axios.delete(`/customers/${id}`);
        dispatch({ type: customerTypes.DELETE_CUSTOMER_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_FAILURE, payload: error.message });
        }
    }
}

export const updateCustomerImage = (id: number, image: File) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.UPDATE_CUSTOMER_IMAGE_REQUEST });
    try {
        const formData = new FormData();
        formData.append("file", image);
        await axios.post(`/customers/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch({ type: customerTypes.UPDATE_CUSTOMER_IMAGE_SUCCESS });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.UPDATE_CUSTOMER_IMAGE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.UPDATE_CUSTOMER_IMAGE_FAILURE, payload: error.message });
        }
    }
}

export const deleteCustomerImage = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.DELETE_CUSTOMER_IMAGE_REQUEST });
    try {
        await axios.delete(`/customers/${id}/image`);
        dispatch({ type: customerTypes.DELETE_CUSTOMER_IMAGE_SUCCESS });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_IMAGE_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_IMAGE_FAILURE, payload: error.message });
        }
    }
}

export const createContact = (customerId: number, contact: Contact) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.CREATE_CUSTOMER_CONTACT_REQUEST });
    try {
        const response = await axios.post(`/customers/${customerId}/contacts`, {
            ...contact,
            customerId
        });
        dispatch({ type: customerTypes.CREATE_CUSTOMER_CONTACT_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.CREATE_CUSTOMER_CONTACT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.CREATE_CUSTOMER_CONTACT_FAILURE, payload: error.message });
        }
    }
}

export const deleteContact = (customerId: number, email: string) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.DELETE_CUSTOMER_CONTACT_REQUEST });
    try {
        await axios.delete(`/customers/${customerId}/contacts/${email}`);
        dispatch({ type: customerTypes.DELETE_CUSTOMER_CONTACT_SUCCESS, payload: email });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_CONTACT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: customerTypes.DELETE_CUSTOMER_CONTACT_FAILURE, payload: error.message });
        }
    }
}

export const inviteContact = (customerId: number, email: string) => async (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.INVITE_CUSTOMER_CONTACT_REQUEST });
    try {
        await axios.post(`/customers/${customerId}/contacts/invite`, {
            customerId,
            email
        });
        dispatch({ type: customerTypes.INVITE_CUSTOMER_CONTACT_SUCCESS });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        dispatch({ type: customerTypes.INVITE_CUSTOMER_CONTACT_FAILURE, payload: error.message });
    }
}

export const resetCustomerStatus = () => (dispatch: Dispatch) => {
    dispatch({ type: customerTypes.RESET_CUSTOMER_STATUS });
}