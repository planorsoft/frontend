
export const currenyTypes = {
    GET_CURRENCIES_REQUEST: 'GET_CURRENCIES_REQUEST',
    GET_CURRENCIES_SUCCESS: 'GET_CURRENCIES_SUCCESS',
    GET_CURRENCIES_FAILURE: 'GET_CURRENCIES_FAILURE',
    
    GET_CURRENCY_REQUEST: 'GET_CURRENCY_REQUEST',
    GET_CURRENCY_SUCCESS: 'GET_CURRENCY_SUCCESS',
    GET_CURRENCY_FAILURE: 'GET_CURRENCY_FAILURE',

    ADD_CURRENCY_REQUEST: 'ADD_CURRENCY_REQUEST',
    ADD_CURRENCY_SUCCESS: 'ADD_CURRENCY_SUCCESS',
    ADD_CURRENCY_FAILURE: 'ADD_CURRENCY_FAILURE',

    UPDATE_CURRENCY_REQUEST: 'UPDATE_CURRENCY_REQUEST',
    UPDATE_CURRENCY_SUCCESS: 'UPDATE_CURRENCY_SUCCESS',
    UPDATE_CURRENCY_FAILURE: 'UPDATE_CURRENCY_FAILURE',

    DELETE_CURRENCY_REQUEST: 'DELETE_CURRENCY_REQUEST',
    DELETE_CURRENCY_SUCCESS: 'DELETE_CURRENCY_SUCCESS',
    DELETE_CURRENCY_FAILURE: 'DELETE_CURRENCY_FAILURE',

    RESET_CURRENCY_STATUS: 'RESET_CURRENCY_STATUS'
}

export interface Currency {
    id?: number;
    code: string;
    symbol?: string;
    rate: number;
    isDefault: boolean;
}

export interface CurrencyState {
    currencies: Currency[];
    currency: Currency | object;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface CurrencyAction {
    type: string;
    payload: Currency | Currency[] | string;
}

export interface CurrencyPayload {
    id?: number;
    code: string;
    symbol?: string;
    rate: number;
}
