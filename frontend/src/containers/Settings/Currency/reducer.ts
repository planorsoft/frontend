import { CurrencyAction, CurrencyState } from "./types";


const currencyInitalState: CurrencyState = {
    currencies: [],
    currency: {},
    loading: false,
    error: null,
    status: null,
};

export const currencyReducer = (state = currencyInitalState, action: CurrencyAction) => {
    switch (action.type) {
        case 'GET_CURRENCIES_REQUEST':
            return {
                ...state,
                loading: true,
                status: 'GET_CURRENCIES_REQUEST'
            };
        case 'GET_CURRENCIES_SUCCESS':
            return {
                ...state,
                loading: false,
                currencies: action.payload,
                status: 'GET_CURRENCIES_SUCCESS'
            };
        case 'GET_CURRENCIES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: 'GET_CURRENCIES_FAILURE'
            };
        case 'GET_CURRENCY_REQUEST':
            return {
                ...state,
                loading: true,
                status: 'GET_CURRENCY_REQUEST'
            };
        case 'GET_CURRENCY_SUCCESS':
            return {
                ...state,
                loading: false,
                currency: action.payload,
                status: 'GET_CURRENCY_SUCCESS'
            };
        case 'GET_CURRENCY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: 'GET_CURRENCY_FAILURE'
            };
        case 'CREATE_CURRENCY_REQUEST':
            return {
                ...state,
                loading: true,
                status: 'CREATE_CURRENCY_REQUEST'
            };
        case 'CREATE_CURRENCY_SUCCESS':
            return {
                ...state,
                loading: false,
                currencies: [...state.currencies, action.payload],
                status: 'CREATE_CURRENCY_SUCCESS'
            };
        case 'CREATE_CURRENCY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: 'CREATE_CURRENCY_FAILURE'
            };
        case 'UPDATE_CURRENCY_REQUEST':
            return {
                ...state,
                loading: true,
                status: 'UPDATE_CURRENCY_REQUEST'
            };
        case 'UPDATE_CURRENCY_SUCCESS':
            return {
                ...state,
                loading: false,
                currencies: state.currencies.map((currency) => currency.id === action.payload.id ? action.payload : currency),
                status: 'UPDATE_CURRENCY_SUCCESS'
            };
        case 'UPDATE_CURRENCY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: 'UPDATE_CURRENCY_FAILURE'
            };
        case 'DELETE_CURRENCY_REQUEST':
            return {
                ...state,
                loading: true,
                status: 'DELETE_CURRENCY_REQUEST'
            };
        case 'DELETE_CURRENCY_SUCCESS':
            return {
                ...state,
                loading: false,
                currencies: state.currencies.filter((currency) => currency.id !== action.payload),
                status: 'DELETE_CURRENCY_SUCCESS'
            };
        case 'DELETE_CURRENCY_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: 'DELETE_CURRENCY_FAILURE'
            };
        case 'RESET_CURRENCY_STATUS':
            return {
                ...state,
                loading: false,
                status: null
            };
        default:
            return state;
    }
}