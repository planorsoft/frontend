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
            return { ...state, loading: true };
        case 'GET_CURRENCIES_SUCCESS':
            return { ...state, loading: false, currencies: action.payload };
        case 'GET_CURRENCIES_FAILURE':
            return { ...state, loading: false, errors: action.payload };
        case 'GET_CURRENCY_REQUEST':
            return { ...state, loading: true };
        case 'GET_CURRENCY_SUCCESS':
            return { ...state, loading: false, currency: action.payload };
        case 'GET_CURRENCY_FAILURE':
            return { ...state, loading: false, errors: action.payload };
        case 'CREATE_CURRENCY_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_CURRENCY_SUCCESS':
            return { ...state, loading: false, currencies: [...state.currencies, action.payload] };
        case 'CREATE_CURRENCY_FAILURE':
            return { ...state, loading: false, errors: action.payload };
        case 'UPDATE_CURRENCY_REQUEST':
            return { ...state, loading: true };
        case 'UPDATE_CURRENCY_SUCCESS':
            return { ...state, loading: false, currencies: state.currencies.map((currency) => currency.id === action.payload.id ? action.payload : currency) };
        case 'UPDATE_CURRENCY_FAILURE':
            return { ...state, loading: false, errors: action.payload };
        case 'DELETE_CURRENCY_REQUEST':
            return { ...state, loading: true };
        case 'DELETE_CURRENCY_SUCCESS':
            return { ...state, loading: false, currencies: state.currencies.filter((currency) => currency.id !== action.payload) };
        case 'DELETE_CURRENCY_FAILURE':
            return { ...state, loading: false, errors: action.payload };
        default:
            return state;
    }
}