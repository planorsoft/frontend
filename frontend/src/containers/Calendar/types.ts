import { Customer } from "../Customer/types";

export const calendarTypes = {
    GET_CALENDAR_EVENTS_REQUEST: 'GET_CALENDAR_EVENTS_REQUEST',
    GET_CALENDAR_EVENTS_SUCCESS: 'GET_CALENDAR_EVENTS_SUCCESS',
    GET_CALENDAR_EVENTS_FAILURE: 'GET_CALENDAR_EVENTS_FAILURE',

    GET_CALENDAR_EVENT_REQUEST: 'GET_CALENDAR_EVENT_REQUEST',
    GET_CALENDAR_EVENT_SUCCESS: 'GET_CALENDAR_EVENT_SUCCESS',
    GET_CALENDAR_EVENT_FAILURE: 'GET_CALENDAR_EVENT_FAILURE',

    CREATE_CALENDAR_EVENT_REQUEST: 'CREATE_CALENDAR_EVENT_REQUEST',
    CREATE_CALENDAR_EVENT_SUCCESS: 'CREATE_CALENDAR_EVENT_SUCCESS',
    CREATE_CALENDAR_EVENT_FAILURE: 'CREATE_CALENDAR_EVENT_FAILURE',

    UPDATE_CALENDAR_EVENT_REQUEST: 'UPDATE_CALENDAR_EVENT_REQUEST',
    UPDATE_CALENDAR_EVENT_SUCCESS: 'UPDATE_CALENDAR_EVENT_SUCCESS',
    UPDATE_CALENDAR_EVENT_FAILURE: 'UPDATE_CALENDAR_EVENT_FAILURE',

    DELETE_CALENDAR_EVENT_REQUEST: 'DELETE_CALENDAR_EVENT_REQUEST',
    DELETE_CALENDAR_EVENT_SUCCESS: 'DELETE_CALENDAR_EVENT_SUCCESS',
    DELETE_CALENDAR_EVENT_FAILURE: 'DELETE_CALENDAR_EVENT_FAILURE',
}

export interface Event {
    id?: number;
    title: string;
    description?: string;
    start: number;
    end?: number;
    color?: string;
    location?: string;
    attendee?: Attendee[];
}

export interface Attendee {
    email: string;
    name: string;
    avatarUri?: string;
    customer?: Customer;
}

export interface CalendarState {
    events: Event[];
    event: Event;
    loading: boolean;
    error?: string;
    status?: string;
}

export interface CalendarAction {
    type: string;
    payload: Event | Event[] | string;
}

export interface CalendarPayload {
    id?: number;
    title: string;
    description?: string;
    start: number;
    end?: number;
    color?: string;
    location?: string;
    attendees?: string[];
}