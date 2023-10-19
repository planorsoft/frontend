import { ApplicationAction, ApplicationState } from "./types";

const applicationInitalState: ApplicationState = {
    application: {},
    title: '',
    loading: false,
    error: null,
    status: null
};

export const applicationReducer = (state = applicationInitalState, action: ApplicationAction) => {
    switch (action.type) {
        case 'GET_CURRENT_APPLICATION_REQUEST':
            return { ...state, loading: true };
        case 'GET_CURRENT_APPLICATION_SUCCESS':
            return { ...state, loading: false, application: action.payload };
        case 'GET_CURRENT_APPLICATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_APPLICATION_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_APPLICATION_SUCCESS':
            return { ...state, loading: false, application: action.payload };
        case 'CREATE_APPLICATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_APPLICATION_REQUEST':
            return { ...state, loading: true };
        case 'UPDATE_APPLICATION_SUCCESS':
            return { ...state, loading: false, application: action.payload };
        case 'UPDATE_APPLICATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_APPLICATION_REQUEST':
            return { ...state, loading: true };
        case 'DELETE_APPLICATION_SUCCESS':
            return { ...state, loading: false, application: action.payload };
        case 'DELETE_APPLICATION_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        default:
            return state;
    }
}
