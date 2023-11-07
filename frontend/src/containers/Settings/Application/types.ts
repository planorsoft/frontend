export const applicationTypes = {
    GET_CURRENT_APPLICATION_REQUEST: 'GET_CURRENT_APPLICATION_REQUEST',
    GET_CURRENT_APPLICATION_SUCCESS: 'GET_CURRENT_APPLICATION_SUCCESS',
    GET_CURRENT_APPLICATION_FAILURE: 'GET_CURRENT_APPLICATION_FAILURE',

    CREATE_APPLICATION_REQUEST: 'CREATE_APPLICATION_REQUEST',
    CREATE_APPLICATION_SUCCESS: 'CREATE_APPLICATION_SUCCESS',
    CREATE_APPLICATION_FAILURE: 'CREATE_APPLICATION_FAILURE',

    UPDATE_APPLICATION_REQUEST: 'UPDATE_APPLICATION_REQUEST',
    UPDATE_APPLICATION_SUCCESS: 'UPDATE_APPLICATION_SUCCESS',
    UPDATE_APPLICATION_FAILURE: 'UPDATE_APPLICATION_FAILURE',

    DELETE_APPLICATION_REQUEST: 'DELETE_APPLICATION_REQUEST',
    DELETE_APPLICATION_SUCCESS: 'DELETE_APPLICATION_SUCCESS',
    DELETE_APPLICATION_FAILURE: 'DELETE_APPLICATION_FAILURE',

    SET_TITLE: 'SET_TITLE',
}

export interface Application {
    id?: number;
    name: string;
    code: string | null;
}

export interface ApplicationState {
    application: Application | object;
    title: string;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface ApplicationAction {
    type: string;
    payload: Application | Application[] | string;
}

export interface ApplicationPayload {
    id?: number;
    name: string;
}

