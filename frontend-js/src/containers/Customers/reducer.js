import customerTypes from "@/containers/Customers/types";

const initialState = {
  customers: [],
  customer: {},
  loading: false,
  error: null,
  success: null,
  status: null,
  totalCount: 0,
  totalPages: 0,
  pageNumber: 0,
  pageSize: 10,
  hasNext: false,
  hasPrevious: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case customerTypes.GET_CUSTOMER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: customerTypes.GET_CUSTOMER_LIST_REQUEST,
      };
    case customerTypes.GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        status: customerTypes.GET_CUSTOMER_LIST_SUCCESS,
        customers: action.payload.items,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        pageNumber: action.payload.pageNumber,
        hasNext: action.payload.pageNumber < action.payload.totalPages,
        hasPrevious: action.payload.pageNumber > 1,
      };
    case customerTypes.GET_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: customerTypes.GET_CUSTOMER_LIST_FAILURE,
      };
    case customerTypes.GET_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: customerTypes.GET_CUSTOMER_REQUEST,
      };
    case customerTypes.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
        status: customerTypes.GET_CUSTOMER_SUCCESS,
        customer: action.payload,
      };
    case customerTypes.GET_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: customerTypes.GET_CUSTOMER_FAILURE,
        customer: {},
      };
    case customerTypes.CREATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: customerTypes.CREATE_CUSTOMER_REQUEST,
      };
    case customerTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.success,
        status: customerTypes.CREATE_CUSTOMER_SUCCESS,
      };
    case customerTypes.CREATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: customerTypes.CREATE_CUSTOMER_FAILURE,
      };
    case customerTypes.UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: customerTypes.UPDATE_CUSTOMER_REQUEST,
      };
    case customerTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload.success,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        status: customerTypes.UPDATE_CUSTOMER_SUCCESS,
      };
    case customerTypes.UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: customerTypes.UPDATE_CUSTOMER_FAILURE,
      };
    case customerTypes.DELETE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        status: customerTypes.DELETE_CUSTOMER_REQUEST,
      };
    case customerTypes.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
        success: action.payload.success,
        status: customerTypes.DELETE_CUSTOMER_SUCCESS,
      };
    case customerTypes.DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
        status: customerTypes.DELETE_CUSTOMER_FAILURE,
      };
    default:
      return state;
  }
};

export default customerReducer;
