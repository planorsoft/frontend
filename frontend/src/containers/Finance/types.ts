import { PaginatedList, Pagination } from "@/lib/types";

export const financeTypes = {
    GET_FINANCES_REQUEST: 'GET_FINANCES_REQUEST',
    GET_FINANCES_SUCCESS: 'GET_FINANCES_SUCCESS',
    GET_FINANCES_FAILURE: 'GET_FINANCES_FAILURE',

    GET_FINANCE_REQUEST: 'GET_FINANCE_REQUEST',
    GET_FINANCE_SUCCESS: 'GET_FINANCE_SUCCESS',
    GET_FINANCE_FAILURE: 'GET_FINANCE_FAILURE',

    CREATE_FINANCE_REQUEST: 'CREATE_FINANCE_REQUEST',
    CREATE_FINANCE_SUCCESS: 'CREATE_FINANCE_SUCCESS',
    CREATE_FINANCE_FAILURE: 'CREATE_FINANCE_FAILURE',

    UPDATE_FINANCE_REQUEST: 'UPDATE_FINANCE_REQUEST',
    UPDATE_FINANCE_SUCCESS: 'UPDATE_FINANCE_SUCCESS',
    UPDATE_FINANCE_FAILURE: 'UPDATE_FINANCE_FAILURE',

    DELETE_FINANCE_REQUEST: 'DELETE_FINANCE_REQUEST',
    DELETE_FINANCE_SUCCESS: 'DELETE_FINANCE_SUCCESS',
    DELETE_FINANCE_FAILURE: 'DELETE_FINANCE_FAILURE',

    GET_FINANCE_CATEGORIES_REQUEST: 'GET_FINANCE_CATEGORIES_REQUEST',
    GET_FINANCE_CATEGORIES_SUCCESS: 'GET_FINANCE_CATEGORIES_SUCCESS',
    GET_FINANCE_CATEGORIES_FAILURE: 'GET_FINANCE_CATEGORIES_FAILURE',

    GET_FINANCE_CATEGORY_REQUEST: 'GET_FINANCE_CATEGORY_REQUEST',
    GET_FINANCE_CATEGORY_SUCCESS: 'GET_FINANCE_CATEGORY_SUCCESS',
    GET_FINANCE_CATEGORY_FAILURE: 'GET_FINANCE_CATEGORY_FAILURE',

    CREATE_FINANCE_CATEGORY_REQUEST: 'CREATE_FINANCE_CATEGORY_REQUEST',
    CREATE_FINANCE_CATEGORY_SUCCESS: 'CREATE_FINANCE_CATEGORY_SUCCESS',
    CREATE_FINANCE_CATEGORY_FAILURE: 'CREATE_FINANCE_CATEGORY_FAILURE',

    UPDATE_FINANCE_CATEGORY_REQUEST: 'UPDATE_FINANCE_CATEGORY_REQUEST',
    UPDATE_FINANCE_CATEGORY_SUCCESS: 'UPDATE_FINANCE_CATEGORY_SUCCESS',
    UPDATE_FINANCE_CATEGORY_FAILURE: 'UPDATE_FINANCE_CATEGORY_FAILURE',

    DELETE_FINANCE_CATEGORY_REQUEST: 'DELETE_FINANCE_CATEGORY_REQUEST',
    DELETE_FINANCE_CATEGORY_SUCCESS: 'DELETE_FINANCE_CATEGORY_SUCCESS',
    DELETE_FINANCE_CATEGORY_FAILURE: 'DELETE_FINANCE_CATEGORY_FAILURE',

    RESET_FINANCE_STATUS: 'RESET_FINANCE_STATUS'
}


export interface Finance {
    id: number | null;
    categoryId: number;
    categoryName?: string;
    description: string | null;
    amount: number;
    date?: number,
    customerId: number | null;
    projectId: number | null;
}

export interface FinanceCategory {
    id: number | null;
    name: string;
}


export interface FinanceState {
    finances: Finance[];
    finance?: Finance;
    financeCategories: FinanceCategory[];
    financeCategory?: FinanceCategory;
    loading: boolean;
    error: string | null;
    status: string | null;
    pagination: Pagination;
}

export interface FinanceAction {
    type: string;
    payload: Finance | Finance[] | PaginatedList<Finance> | FinanceCategory | FinanceCategory[] | string | number;
}

export interface FinancePayload {
    id?: number;
    categoryId: number;
    description?: string;
    amount: number;
    date?: number,
    customerId?: number;
    projectId?: number;
}

export interface FinanceCategoryPayload {
    id?: number;
    name: string;
}