import { Project } from "../Project/types";

export const dutyTypes = {
    GET_ACTIVE_DUTIES_REQUEST: 'GET_ACTIVE_DUTIES_REQUEST',
    GET_ACTIVE_DUTIES_SUCCESS: 'GET_ACTIVE_DUTIES_SUCCESS',
    GET_ACTIVE_DUTIES_FAILURE: 'GET_ACTIVE_DUTIES_FAILURE',

    GET_DUTY_REQUEST: 'GET_DUTY_REQUEST',
    GET_DUTY_SUCCESS: 'GET_DUTY_SUCCESS',
    GET_DUTY_FAILURE: 'GET_DUTY_FAILURE',

    CREATE_DUTY_REQUEST: 'CREATE_DUTY_REQUEST',
    CREATE_DUTY_SUCCESS: 'CREATE_DUTY_SUCCESS',
    CREATE_DUTY_FAILURE: 'CREATE_DUTY_FAILURE',

    UPDATE_DUTY_REQUEST: 'UPDATE_DUTY_REQUEST',
    UPDATE_DUTY_SUCCESS: 'UPDATE_DUTY_SUCCESS',
    UPDATE_DUTY_FAILURE: 'UPDATE_DUTY_FAILURE',

    UPDATE_DUTY_ORDERS_REQUEST: 'UPDATE_DUTY_ORDERS_REQUEST',
    UPDATE_DUTY_ORDERS_SUCCESS: 'UPDATE_DUTY_ORDERS_SUCCESS',
    UPDATE_DUTY_ORDERS_FAILURE: 'UPDATE_DUTY_ORDERS_FAILURE',

    DELETE_DUTY_REQUEST: 'DELETE_DUTY_REQUEST',
    DELETE_DUTY_SUCCESS: 'DELETE_DUTY_SUCCESS',
    DELETE_DUTY_FAILURE: 'DELETE_DUTY_FAILURE',

    GET_DUTY_CATEGORIES_REQUEST: 'GET_DUTY_CATEGORIES_REQUEST',
    GET_DUTY_CATEGORIES_SUCCESS: 'GET_DUTY_CATEGORIES_SUCCESS',
    GET_DUTY_CATEGORIES_FAILURE: 'GET_DUTY_CATEGORIES_FAILURE',

    GET_DUTY_CATEGORY_REQUEST: 'GET_DUTY_CATEGORY_REQUEST',
    GET_DUTY_CATEGORY_SUCCESS: 'GET_DUTY_CATEGORY_SUCCESS',
    GET_DUTY_CATEGORY_FAILURE: 'GET_DUTY_CATEGORY_FAILURE',

    CREATE_DUTY_CATEGORY_REQUEST: 'CREATE_DUTY_CATEGORY_REQUEST',
    CREATE_DUTY_CATEGORY_SUCCESS: 'CREATE_DUTY_CATEGORY_SUCCESS',
    CREATE_DUTY_CATEGORY_FAILURE: 'CREATE_DUTY_CATEGORY_FAILURE',

    UPDATE_DUTY_CATEGORY_REQUEST: 'UPDATE_DUTY_CATEGORY_REQUEST',
    UPDATE_DUTY_CATEGORY_SUCCESS: 'UPDATE_DUTY_CATEGORY_SUCCESS',
    UPDATE_DUTY_CATEGORY_FAILURE: 'UPDATE_DUTY_CATEGORY_FAILURE',

    DELETE_DUTY_CATEGORY_REQUEST: 'DELETE_DUTY_CATEGORY_REQUEST',
    DELETE_DUTY_CATEGORY_SUCCESS: 'DELETE_DUTY_CATEGORY_SUCCESS',
    DELETE_DUTY_CATEGORY_FAILURE: 'DELETE_DUTY_CATEGORY_FAILURE',

    GET_DUTY_SIZES_REQUEST: 'GET_DUTY_SIZES_REQUEST',
    GET_DUTY_SIZES_SUCCESS: 'GET_DUTY_SIZES_SUCCESS',
    GET_DUTY_SIZES_FAILURE: 'GET_DUTY_SIZES_FAILURE',

    GET_DUTY_SIZE_REQUEST: 'GET_DUTY_SIZE_REQUEST',
    GET_DUTY_SIZE_SUCCESS: 'GET_DUTY_SIZE_SUCCESS',
    GET_DUTY_SIZE_FAILURE: 'GET_DUTY_SIZE_FAILURE',

    CREATE_DUTY_SIZE_REQUEST: 'CREATE_DUTY_SIZE_REQUEST',
    CREATE_DUTY_SIZE_SUCCESS: 'CREATE_DUTY_SIZE_SUCCESS',
    CREATE_DUTY_SIZE_FAILURE: 'CREATE_DUTY_SIZE_FAILURE',

    UPDATE_DUTY_SIZE_REQUEST: 'UPDATE_DUTY_SIZE_REQUEST',
    UPDATE_DUTY_SIZE_SUCCESS: 'UPDATE_DUTY_SIZE_SUCCESS',
    UPDATE_DUTY_SIZE_FAILURE: 'UPDATE_DUTY_SIZE_FAILURE',

    DELETE_DUTY_SIZE_REQUEST: 'DELETE_DUTY_SIZE_REQUEST',
    DELETE_DUTY_SIZE_SUCCESS: 'DELETE_DUTY_SIZE_SUCCESS',
    DELETE_DUTY_SIZE_FAILURE: 'DELETE_DUTY_SIZE_FAILURE',
};

export interface Duty {
    id: number;
    title: string;
    description: string;
    sizeId?: number;
    size?: DutySize;
    priorityId?: number;
    priority?: DutyPriority;
    categoryId: number;
    category?: DutyCategory;
    projectId: number;
    project?: Project;
    completed?: boolean;
    order?: number;
    assignedTo?: string;
}

export interface DutyCategory {
    id?: number;
    title: string;
}

export interface DutySize {
    id: number;
    name: string;
    score: number;
}

export interface DutyPriority {
    id: number;
    name: string;
    score: number;
}

export interface DutyState {
    duties: Duty[];
    duty: Duty;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface DutyCategoryState {
    dutyCategories: DutyCategory[];
    dutyCategory: DutyCategory;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface DutySizeState {
    dutySizes: DutySize[];
    dutySize: DutySize;
    loading: boolean;
    error: string | null;
    status: string | null;
}

export interface DutyAction {
    type: string;
    payload: Duty | Duty[] | string | number | null;
}

export interface DutyCategoryAction {
    type: string;
    payload: DutyCategory | DutyCategory[] | string | number | null;
}

export interface DutySizeAction {
    type: string;
    payload: DutySize | DutySize[] | string | number | null;
}





