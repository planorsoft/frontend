import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { Duty, DutyCategory, DutySize, dutyTypes } from "./types";
import { AxiosError } from "axios";

// ---------------------------------------------------------------------------- DUTY
export const getActiveDuties = (projectId?: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_ACTIVE_DUTIES_REQUEST });
    try {
        let query = "/duties";
        if (projectId) {
            query += `?projectId=${projectId}`;
        }
        const { data } = await axios.get(query);
        dispatch({ type: dutyTypes.GET_ACTIVE_DUTIES_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_ACTIVE_DUTIES_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_ACTIVE_DUTIES_FAILURE, payload: error.message });
        }
    }
}

export const getDuty = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_REQUEST });
    try {
        const { data } = await axios.get(`/duties/${id}`);
        dispatch({ type: dutyTypes.GET_DUTY_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_DUTY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_DUTY_FAILURE, payload: error.message });
        }
    }
}

export const createDuty = (data: Duty) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.CREATE_DUTY_REQUEST });
    try {
        const result = await axios.post("/duties", data);
        const response = data;
        response.id = result.data;
        dispatch({ type: dutyTypes.CREATE_DUTY_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.CREATE_DUTY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.CREATE_DUTY_FAILURE, payload: error.message });
        }
    }
}

export const updateDuty = (id: number, data: Duty) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.UPDATE_DUTY_REQUEST });
    try {
        await axios.put(`/duties/${id}`, data);
        dispatch({ type: dutyTypes.UPDATE_DUTY_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.UPDATE_DUTY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.UPDATE_DUTY_FAILURE, payload: error.message });
        }
    }
}

export const updateDutyOrders = (data: Array<object>) => async (dispatch: Dispatch) => {
    console.log(data);
    dispatch({ type: dutyTypes.UPDATE_DUTY_ORDERS_REQUEST, payload: data });
    try {
        await axios.put("/duties/orders", data);
        dispatch({ type: dutyTypes.UPDATE_DUTY_ORDERS_SUCCESS });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.UPDATE_DUTY_ORDERS_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.UPDATE_DUTY_ORDERS_FAILURE, payload: error.message });
        }
    }
}

export const deleteDuty = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.DELETE_DUTY_REQUEST });
    try {
        await axios.delete(`/duties/${id}`);
        dispatch({ type: dutyTypes.DELETE_DUTY_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.DELETE_DUTY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.DELETE_DUTY_FAILURE, payload: error.message });
        }
    }
}

// ---------------------------------------------------------------------------- DUTY CATEGORY

export const getDutyCategories = () => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_CATEGORIES_REQUEST });
    try {
        const { data } = await axios.get("/duty/categories");
        dispatch({ type: dutyTypes.GET_DUTY_CATEGORIES_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_DUTY_CATEGORIES_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_DUTY_CATEGORIES_FAILURE, payload: error.message });
        }
    }
}

export const getDutyCategory = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_CATEGORY_REQUEST });
    try {
        const { data } = await axios.get(`/duty/categories/${id}`);
        dispatch({ type: dutyTypes.GET_DUTY_CATEGORY_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_DUTY_CATEGORY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_DUTY_CATEGORY_FAILURE, payload: error.message });
        }
    }
}

export const createDutyCategory = (data: DutyCategory) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.CREATE_DUTY_CATEGORY_REQUEST });
    try {
        const result = await axios.post("/duty/categories", data);
        const response = data;
        response.id = result.data;
        dispatch({ type: dutyTypes.CREATE_DUTY_CATEGORY_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.CREATE_DUTY_CATEGORY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.CREATE_DUTY_CATEGORY_FAILURE, payload: error.message });
        }
    }
}

export const updateDutyCategory = (id: number, data: DutyCategory) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.UPDATE_DUTY_CATEGORY_REQUEST });
    try {
        await axios.put(`/duty/categories/${id}`, data);
        dispatch({ type: dutyTypes.UPDATE_DUTY_CATEGORY_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.UPDATE_DUTY_CATEGORY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.UPDATE_DUTY_CATEGORY_FAILURE, payload: error.message });
        }
    }
}

export const deleteDutyCategory = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.DELETE_DUTY_CATEGORY_REQUEST });
    try {
        await axios.delete(`/duty/categories/${id}`);
        dispatch({ type: dutyTypes.DELETE_DUTY_CATEGORY_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.DELETE_DUTY_CATEGORY_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.DELETE_DUTY_CATEGORY_FAILURE, payload: error.message });
        }
    }
}

// ---------------------------------------------------------------------------- DUTY SIZE

export const getDutySizes = () => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_SIZES_REQUEST });
    try {
        const { data } = await axios.get("/duty/sizes");
        dispatch({ type: dutyTypes.GET_DUTY_SIZES_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_DUTY_SIZES_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_DUTY_SIZES_FAILURE, payload: error.message });
        }
    }
}

export const getDutySize = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_SIZE_REQUEST });
    try {
        const { data } = await axios.get(`/duty/sizes/${id}`);
        dispatch({ type: dutyTypes.GET_DUTY_SIZE_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.GET_DUTY_SIZE_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.GET_DUTY_SIZE_FAILURE, payload: error.message });
        }
    }
}

export const createDutySize = (data: DutySize) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.CREATE_DUTY_SIZE_REQUEST });
    try {
        const response = await axios.post("/duty/sizes", data);
        dispatch({ type: dutyTypes.CREATE_DUTY_SIZE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.CREATE_DUTY_SIZE_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.CREATE_DUTY_SIZE_FAILURE, payload: error.message });
        }
    }
}

export const updateDutySize = (id: number, data: DutySize) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.UPDATE_DUTY_SIZE_REQUEST });
    try {
        const response = await axios.put(`/duty/sizes/${id}`, data);
        dispatch({ type: dutyTypes.UPDATE_DUTY_SIZE_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.UPDATE_DUTY_SIZE_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.UPDATE_DUTY_SIZE_FAILURE, payload: error.message });
        }
    }
}

export const deleteDutySize = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.DELETE_DUTY_SIZE_REQUEST });
    try {
        await axios.delete(`/duty/sizes/${id}`);
        dispatch({ type: dutyTypes.DELETE_DUTY_SIZE_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response?.data) {
            dispatch({ type: dutyTypes.DELETE_DUTY_SIZE_FAILURE, payload: error.response.data.detail });
        } else {
            dispatch({ type: dutyTypes.DELETE_DUTY_SIZE_FAILURE, payload: error.message });
        }
    }
}

/*
// ---------------------------------------------------------------------------- DUTY PRIORITIES


export const getDutyPriorities = () => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_PRIORITIES_REQUEST });
    try {
        const { data } = await axios.get("/duties/priorities");
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITIES_SUCCESS, payload: data });
    } catch (error : unknown) {
         if (!(error instanceof AxiosError)) { throw error; }
         if (error.response?.data)
         {
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITIES_FAILURE, payload: error.message });
         } else {
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITIES_FAILURE, payload: error.message });
         }
    }
}

export const getDutyPriority = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.GET_DUTY_PRIORITY_REQUEST });
    try {
        const { data } = await axios.get(`/duties/priorities/${id}`);
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITY_SUCCESS, payload: data });
    } catch (error : unknown) {
         if (!(error instanceof AxiosError)) { throw error; }
         if (error.response?.data)
         {
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITY_FAILURE, payload: error.message });
         } else {
        dispatch({ type: dutyTypes.GET_DUTY_PRIORITY_FAILURE, payload: error.message });
         }
    }
}

export const createDutyPriority = (data: DutyPriority) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.CREATE_DUTY_PRIORITY_REQUEST });
    try {
        const response = await axios.post("/duties/priorities", data);
        dispatch({ type: dutyTypes.CREATE_DUTY_PRIORITY_SUCCESS, payload: response.data });
    } catch (error : unknown) {
         if (!(error instanceof AxiosError)) { throw error; }
         if (error.response?.data)
         {
        dispatch({ type: dutyTypes.CREATE_DUTY_PRIORITY_FAILURE, payload: error.message });
         } else {
        dispatch({ type: dutyTypes.CREATE_DUTY_PRIORITY_FAILURE, payload: error.message });
         }
    }
}

export const updateDutyPriority = (id: number, data: DutyPriority) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.UPDATE_DUTY_PRIORITY_REQUEST });
    try {
        const response = await axios.put(`/duties/priorities/${id}`, data);
        dispatch({ type: dutyTypes.UPDATE_DUTY_PRIORITY_SUCCESS, payload: response.data });
    } catch (error : unknown) {
         if (!(error instanceof AxiosError)) { throw error; }
         if (error.response?.data)
         {
        dispatch({ type: dutyTypes.UPDATE_DUTY_PRIORITY_FAILURE, payload: error.message });
         } else {
        dispatch({ type: dutyTypes.UPDATE_DUTY_PRIORITY_FAILURE, payload: error.message });
         }
    }
}

export const deleteDutyPriority = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: dutyTypes.DELETE_DUTY_PRIORITY_REQUEST });
    try {
        await axios.delete(`/duties/priorities/${id}`);
        dispatch({ type: dutyTypes.DELETE_DUTY_PRIORITY_SUCCESS, payload: id });
    } catch (error : unknown) {
         if (!(error instanceof AxiosError)) { throw error; }
         if (error.response?.data)
         {
        dispatch({ type: dutyTypes.DELETE_DUTY_PRIORITY_FAILURE, payload: error.message });
         } else {
        dispatch({ type: dutyTypes.DELETE_DUTY_PRIORITY_FAILURE, payload: error.message });
         }
    }
}
*/