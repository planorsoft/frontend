import currencyTypes from "@/containers/Settings/Currency/types";

const initialState = {
  currencies: [],
  currency: {},
  loading: false,
  error: null,
  success: null,
  status: null,
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyTypes.GET_CURRENCY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: currencyTypes.GET_CURRENCY_LIST_REQUEST,
      };
    case currencyTypes.GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        status: currencyTypes.GET_CURRENCY_LIST_SUCCESS,
        currencies: action.payload,
      };
    case currencyTypes.GET_CURRENCY_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: currencyTypes.GET_CURRENCY_LIST_FAILURE,
      };
    case currencyTypes.GET_CURRENCY:
      return {
        ...state,
        currency: state.currencies.find(
          (currency) => currency.id === action.payload
        ),
        loading: false,
        error: null,
        status: currencyTypes.GET_CURRENCY,
      };
    case currencyTypes.CREATE_CURRENCY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: currencyTypes.CREATE_CURRENCY_REQUEST,
      };
    case currencyTypes.CREATE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.success,
        status: currencyTypes.CREATE_CURRENCY_SUCCESS,
      };
    case currencyTypes.CREATE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: currencyTypes.CREATE_CURRENCY_FAILURE,
      };
    case currencyTypes.UPDATE_CURRENCY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: currencyTypes.UPDATE_CURRENCY_REQUEST,
      };
    case currencyTypes.UPDATE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.success,
        currencies: state.currencies.map((currency) =>
          currency.id === action.payload.id ? action.payload : currency
        ),
        status: currencyTypes.UPDATE_CURRENCY_SUCCESS,
      };
    case currencyTypes.UPDATE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: currencyTypes.UPDATE_CURRENCY_FAILURE,
      };
    case currencyTypes.DELETE_CURRENCY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: currencyTypes.DELETE_CURRENCY_REQUEST,
      };
    case currencyTypes.DELETE_CURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        currencies: state.currencies.filter(
          (currency) => currency.id !== action.payload
        ),
        success: action.payload.success,
        status: currencyTypes.DELETE_CURRENCY_SUCCESS,
      };
    case currencyTypes.DELETE_CURRENCY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: currencyTypes.DELETE_CURRENCY_FAILURE,
      };
    default:
      return state;
  }
};

export default currencyReducer;
