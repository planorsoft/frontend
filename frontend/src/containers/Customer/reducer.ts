import { Contact, Customer, CustomerAction, CustomerState, customerTypes } from "./types";
import { PaginatedList } from "@/lib/types";

export const customerInitalState: CustomerState = {
    customers: [],
    customer: undefined,
    loading: false,
    error: null,
    status: null,
    pagination: {
        pageNumber: 0,
        totalPages: 0,
        totalCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
    }
};

export const customerReducer = (state = customerInitalState, action: CustomerAction) => {
    switch (action.type) {
        case customerTypes.GET_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.GET_CUSTOMERS_REQUEST
            };
        case customerTypes.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: (action.payload as PaginatedList<Customer>).items,
                status: customerTypes.GET_CUSTOMERS_SUCCESS,
                pagination: {
                    pageNumber: (action.payload as PaginatedList<Customer>).pageNumber,
                    totalPages: (action.payload as PaginatedList<Customer>).totalPages,
                    totalCount: (action.payload as PaginatedList<Customer>).totalCount,
                    hasPreviousPage: (action.payload as PaginatedList<Customer>).hasPreviousPage,
                    hasNextPage: (action.payload as PaginatedList<Customer>).hasNextPage,
                }
            };
        case customerTypes.GET_CUSTOMERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.GET_CUSTOMERS_FAILURE
            };
        case customerTypes.GET_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.GET_CUSTOMER_REQUEST
            };
        case customerTypes.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: action.payload,
                status: customerTypes.GET_CUSTOMER_SUCCESS
            };
        case customerTypes.GET_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.GET_CUSTOMER_FAILURE
            };
        case customerTypes.CREATE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.CREATE_CUSTOMER_REQUEST
            };
        case customerTypes.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: [...state.customers, action.payload],
                status: customerTypes.CREATE_CUSTOMER_SUCCESS
            };
        case customerTypes.CREATE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.CREATE_CUSTOMER_FAILURE
            };
        case customerTypes.UPDATE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.UPDATE_CUSTOMER_REQUEST
            };
        case customerTypes.UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.map((customer: Customer) => customer.id === action.payload.id ? action.payload : customer),
                status: customerTypes.UPDATE_CUSTOMER_SUCCESS
            };
        case customerTypes.UPDATE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.UPDATE_CUSTOMER_FAILURE
            };
        case customerTypes.DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.DELETE_CUSTOMER_REQUEST
            };
        case customerTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: state.customers.filter((customer: Customer) => customer.id !== action.payload),
                status: customerTypes.DELETE_CUSTOMER_SUCCESS
            };
        case customerTypes.DELETE_CUSTOMER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.DELETE_CUSTOMER_FAILURE
            };
        case customerTypes.UPDATE_CUSTOMER_IMAGE_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.UPDATE_CUSTOMER_IMAGE_REQUEST
            };
        case customerTypes.UPDATE_CUSTOMER_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: {
                    ...state.customer,
                    imageUri: action.payload
                },
                status: customerTypes.UPDATE_CUSTOMER_IMAGE_SUCCESS
            };
        case customerTypes.UPDATE_CUSTOMER_IMAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.UPDATE_CUSTOMER_IMAGE_FAILURE
            };
        case customerTypes.DELETE_CUSTOMER_IMAGE_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.DELETE_CUSTOMER_IMAGE_REQUEST
            };
        case customerTypes.DELETE_CUSTOMER_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: {
                    ...state.customer,
                    imageUri: undefined
                },
                status: customerTypes.DELETE_CUSTOMER_IMAGE_SUCCESS
            };
        case customerTypes.DELETE_CUSTOMER_IMAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.DELETE_CUSTOMER_IMAGE_FAILURE
            };
        case customerTypes.CREATE_CUSTOMER_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.CREATE_CUSTOMER_CONTACT_REQUEST
            };
        case customerTypes.CREATE_CUSTOMER_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: {
                    ...state.customer,
                    contacts: [...state.customer?.contacts as Contact[], action.payload]
                },
                status: customerTypes.CREATE_CUSTOMER_CONTACT_SUCCESS
            };
        case customerTypes.CREATE_CUSTOMER_CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.CREATE_CUSTOMER_CONTACT_FAILURE
            };
        case customerTypes.DELETE_CUSTOMER_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.DELETE_CUSTOMER_CONTACT_REQUEST
            };
        case customerTypes.DELETE_CUSTOMER_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                customer: {
                    ...state.customer,
                    contacts: state.customer?.contacts?.filter((contact: Contact) => contact.email !== action.payload)
                },
                status: customerTypes.DELETE_CUSTOMER_CONTACT_SUCCESS
            };
        case customerTypes.DELETE_CUSTOMER_CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.DELETE_CUSTOMER_CONTACT_FAILURE
            };
        case customerTypes.INVITE_CUSTOMER_CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
                status: customerTypes.INVITE_CUSTOMER_CONTACT_REQUEST
            };
        case customerTypes.INVITE_CUSTOMER_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                status: customerTypes.INVITE_CUSTOMER_CONTACT_SUCCESS
            };
        case customerTypes.INVITE_CUSTOMER_CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: customerTypes.INVITE_CUSTOMER_CONTACT_FAILURE
            };
        case customerTypes.RESET_CUSTOMER_STATUS:
            return {
                ...state,
                status: null
            };
        default:
            return state;
    }
}