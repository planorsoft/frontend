import { PaginatedList } from "@/lib/types";
import { Finance, FinanceAction, FinanceCategory, FinanceState, financeTypes } from "./types";

const financeInitialState: FinanceState = {
    finances: [],
    finance: undefined,
    financeCategories: [],
    financeCategory: undefined,
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

export const financeReducer = (state = financeInitialState, action: FinanceAction) => {
    switch (action.type) {
        case financeTypes.GET_FINANCES_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.GET_FINANCES_REQUEST
            };
        case financeTypes.GET_FINANCES_SUCCESS:
            return {
                ...state,
                loading: false,
                finances: (action.payload as PaginatedList<Finance>).items,
                status: financeTypes.GET_FINANCES_SUCCESS,
                pagination: {
                    pageNumber: (action.payload as PaginatedList<Finance>).pageNumber,
                    totalPages: (action.payload as PaginatedList<Finance>).totalPages,
                    totalCount: (action.payload as PaginatedList<Finance>).totalCount,
                    hasPreviousPage: (action.payload as PaginatedList<Finance>).hasPreviousPage,
                    hasNextPage: (action.payload as PaginatedList<Finance>).hasNextPage,
                }
            };
        case financeTypes.GET_FINANCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.GET_FINANCES_FAILURE
            };
        case financeTypes.GET_FINANCE_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.GET_FINANCE_REQUEST
            };
        case financeTypes.GET_FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                finance: action.payload,
                status: financeTypes.GET_FINANCE_SUCCESS
            };
        case financeTypes.GET_FINANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.GET_FINANCE_FAILURE
            };
        case financeTypes.CREATE_FINANCE_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.CREATE_FINANCE_REQUEST
            };
        case financeTypes.CREATE_FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                finances: [...state.finances, action.payload],
                status: financeTypes.CREATE_FINANCE_SUCCESS
            };
        case financeTypes.CREATE_FINANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.CREATE_FINANCE_FAILURE
            };
        case financeTypes.UPDATE_FINANCE_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.UPDATE_FINANCE_REQUEST
            };
        case financeTypes.UPDATE_FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                finances: state.finances.map(finance => finance.id === (action.payload as Finance).id ? action.payload : finance),
                status: financeTypes.UPDATE_FINANCE_SUCCESS
            };
        case financeTypes.UPDATE_FINANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.UPDATE_FINANCE_FAILURE
            };
        case financeTypes.DELETE_FINANCE_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.DELETE_FINANCE_REQUEST
            };
        case financeTypes.DELETE_FINANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                finances: state.finances.filter((finance: Finance) => finance.id !== action.payload),
                status: financeTypes.DELETE_FINANCE_SUCCESS
            };
        case financeTypes.DELETE_FINANCE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.DELETE_FINANCE_FAILURE
            };
        case financeTypes.GET_FINANCE_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.GET_FINANCE_CATEGORIES_REQUEST
            };
        case financeTypes.GET_FINANCE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                financeCategories: action.payload,
                status: financeTypes.GET_FINANCE_CATEGORIES_SUCCESS
            };
        case financeTypes.GET_FINANCE_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.GET_FINANCE_CATEGORIES_FAILURE
            };
        case financeTypes.GET_FINANCE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.GET_FINANCE_CATEGORY_REQUEST
            };
        case financeTypes.GET_FINANCE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                financeCategory: action.payload,
                status: financeTypes.GET_FINANCE_CATEGORY_SUCCESS
            };
        case financeTypes.GET_FINANCE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.GET_FINANCE_CATEGORY_FAILURE
            };
        case financeTypes.CREATE_FINANCE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.CREATE_FINANCE_CATEGORY_REQUEST
            };
        case financeTypes.CREATE_FINANCE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                financeCategories: [...state.financeCategories, action.payload],
                status: financeTypes.CREATE_FINANCE_CATEGORY_SUCCESS
            };
        case financeTypes.CREATE_FINANCE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.CREATE_FINANCE_CATEGORY_FAILURE
            };
        case financeTypes.UPDATE_FINANCE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.UPDATE_FINANCE_CATEGORY_REQUEST
            };
        case financeTypes.UPDATE_FINANCE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                financeCategories: state.financeCategories.map(financeCategory => financeCategory.id === (action.payload as FinanceCategory).id ? action.payload : financeCategory),
                status: financeTypes.UPDATE_FINANCE_CATEGORY_SUCCESS
            };
        case financeTypes.UPDATE_FINANCE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.UPDATE_FINANCE_CATEGORY_FAILURE
            };
        case financeTypes.DELETE_FINANCE_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: financeTypes.DELETE_FINANCE_CATEGORY_REQUEST
            };
        case financeTypes.DELETE_FINANCE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                financeCategories: state.financeCategories.filter((finance: FinanceCategory) => finance.id !== action.payload),
                status: financeTypes.DELETE_FINANCE_CATEGORY_SUCCESS
            };
        case financeTypes.DELETE_FINANCE_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: financeTypes.DELETE_FINANCE_CATEGORY_FAILURE
            };
        case financeTypes.RESET_FINANCE_STATUS:
            return {
                ...state,
                status: null
            };
        default:
            return state;
    }
}