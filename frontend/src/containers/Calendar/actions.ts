import axios from "@/lib/axios";
import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { Event, calendarTypes } from "./types";
import { DateTime } from "luxon";

export const getEventsByMonth = (month: number) => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_REQUEST });
    try {
        const date = new Date();
        const greaterThen = DateTime.fromJSDate(new Date(date.getFullYear(), month, 1)).toUnixInteger();
        const lessThen = DateTime.fromJSDate(new Date(date.getFullYear(), month+1, 1)).toUnixInteger();
        const filter = `start gt ${greaterThen} and start lt ${lessThen}`;
        const response = await axios.get(`odata/events?$filter=${filter}`);
        dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_SUCCESS, payload: response.data.value });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_FAILURE, payload: error.message });
        }
    }
}


export const getEvents = () => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_REQUEST });
    try {
        const response = await axios.get('/events');
        dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENTS_FAILURE, payload: error.message });
        }
    }
}

export const getEvent = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.GET_CALENDAR_EVENT_REQUEST });
    try {
        const response = await axios.get(`/events/${id}`);
        dispatch({ type: calendarTypes.GET_CALENDAR_EVENT_SUCCESS, payload: response.data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENT_FAILURE, payload: error.response?.data.title });
        } else {
            dispatch({ type: calendarTypes.GET_CALENDAR_EVENT_FAILURE, payload: error.message });
        }
    }
}

export const createEvent = (data: Event) => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.CREATE_CALENDAR_EVENT_REQUEST });
    try {
        const result = await axios.post('/events', data);
        const response = data;
        response.id = result.data;
        response.attendee = response.attendee?.map((item) => ({ email: item }));
        dispatch({ type: calendarTypes.CREATE_CALENDAR_EVENT_SUCCESS, payload: response });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        if (error.response) {
            dispatch({ type: calendarTypes.CREATE_CALENDAR_EVENT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: calendarTypes.CREATE_CALENDAR_EVENT_FAILURE, payload: error.message });
        }
    }
}

export const updateEvent = (id: number, data: Event) => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.UPDATE_CALENDAR_EVENT_REQUEST });
    try {
        await axios.put(`/events/${id}`, data);
        dispatch({ type: calendarTypes.UPDATE_CALENDAR_EVENT_SUCCESS, payload: data });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        console.log(error.response);
        if (error.response) {
            dispatch({ type: calendarTypes.UPDATE_CALENDAR_EVENT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: calendarTypes.UPDATE_CALENDAR_EVENT_FAILURE, payload: error.message });
        }
    }
}

export const deleteEvent = (id: number) => async (dispatch: Dispatch) => {
    dispatch({ type: calendarTypes.DELETE_CALENDAR_EVENT_REQUEST });
    try {
        await axios.delete(`/events/${id}`);
        dispatch({ type: calendarTypes.DELETE_CALENDAR_EVENT_SUCCESS, payload: id });
    } catch (error: unknown) {
        if (!(error instanceof AxiosError)) { throw error; }
        console.log(error.response);
        if (error.response) {
            dispatch({ type: calendarTypes.DELETE_CALENDAR_EVENT_FAILURE, payload: error.response?.data.detail });
        } else {
            dispatch({ type: calendarTypes.DELETE_CALENDAR_EVENT_FAILURE, payload: error.message });
        }
    }
}