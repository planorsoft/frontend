
import { CalendarAction, CalendarState, Event, calendarTypes } from "./types";


const calendarInitalState: CalendarState = {
    events: [
    ],
    event: {
        id: 0,
        title: '',
        description: '',
        location: '',
        start: 0,
        end: undefined,
        color: '',
    },
    loading: false,
    error: undefined,
    status: undefined,
};

export const calendarReducer = (state = calendarInitalState, action: CalendarAction) => {
    switch (action.type) {
        case calendarTypes.GET_CALENDAR_EVENTS_REQUEST:
            return { 
                ...state, 
                loading: true,
                status: calendarTypes.GET_CALENDAR_EVENTS_REQUEST
            };
        case calendarTypes.GET_CALENDAR_EVENTS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                events: action.payload,
                status: calendarTypes.GET_CALENDAR_EVENTS_SUCCESS
            };
        case calendarTypes.GET_CALENDAR_EVENTS_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                status: calendarTypes.GET_CALENDAR_EVENTS_FAILURE
            };
        case calendarTypes.GET_CALENDAR_EVENT_REQUEST:
            return { 
                ...state, 
                loading: true,
                status: calendarTypes.GET_CALENDAR_EVENT_REQUEST
            };
        case calendarTypes.GET_CALENDAR_EVENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                event: action.payload,
                status: calendarTypes.GET_CALENDAR_EVENT_SUCCESS
            };
        case calendarTypes.GET_CALENDAR_EVENT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                status: calendarTypes.GET_CALENDAR_EVENT_FAILURE
            };
        case calendarTypes.CREATE_CALENDAR_EVENT_REQUEST:
            return { 
                ...state, 
                loading: true,
                status: calendarTypes.CREATE_CALENDAR_EVENT_REQUEST
            };
        case calendarTypes.CREATE_CALENDAR_EVENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                events: [...state.events, action.payload as unknown as Event],
                status: calendarTypes.CREATE_CALENDAR_EVENT_SUCCESS
            };
        case calendarTypes.CREATE_CALENDAR_EVENT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                status: calendarTypes.CREATE_CALENDAR_EVENT_FAILURE
            };
        case calendarTypes.UPDATE_CALENDAR_EVENT_REQUEST:
            return { 
                ...state, 
                loading: true,
                status: calendarTypes.UPDATE_CALENDAR_EVENT_REQUEST
            };
        case calendarTypes.UPDATE_CALENDAR_EVENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                events: state.events.map((event) => event.id === (action.payload as unknown as Event).id ? action.payload : event),
                status: calendarTypes.UPDATE_CALENDAR_EVENT_SUCCESS
            };
        case calendarTypes.UPDATE_CALENDAR_EVENT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                status: calendarTypes.UPDATE_CALENDAR_EVENT_FAILURE
            };
        case calendarTypes.DELETE_CALENDAR_EVENT_REQUEST:
            return { 
                ...state, 
                loading: true,
                status: calendarTypes.DELETE_CALENDAR_EVENT_REQUEST
            };
        case calendarTypes.DELETE_CALENDAR_EVENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                events: state.events.filter((event) => event.id !== (action.payload as unknown as number)),
                status: calendarTypes.DELETE_CALENDAR_EVENT_SUCCESS
            };
        case calendarTypes.DELETE_CALENDAR_EVENT_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                status: calendarTypes.DELETE_CALENDAR_EVENT_FAILURE
            };
        default:
            return state;
    }
}