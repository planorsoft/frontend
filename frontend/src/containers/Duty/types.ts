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

    GET_DUTY_PRIORITIES_REQUEST: 'GET_DUTY_PRIORITIES_REQUEST',
    GET_DUTY_PRIORITIES_SUCCESS: 'GET_DUTY_PRIORITIES_SUCCESS',
    GET_DUTY_PRIORITIES_FAILURE: 'GET_DUTY_PRIORITIES_FAILURE',

    GET_DUTY_PRIORITY_REQUEST: 'GET_DUTY_PRIORITY_REQUEST',
    GET_DUTY_PRIORITY_SUCCESS: 'GET_DUTY_PRIORITY_SUCCESS',
    GET_DUTY_PRIORITY_FAILURE: 'GET_DUTY_PRIORITY_FAILURE',

    CREATE_DUTY_PRIORITY_REQUEST: 'CREATE_DUTY_PRIORITY_REQUEST',
    CREATE_DUTY_PRIORITY_SUCCESS: 'CREATE_DUTY_PRIORITY_SUCCESS',
    CREATE_DUTY_PRIORITY_FAILURE: 'CREATE_DUTY_PRIORITY_FAILURE',

    UPDATE_DUTY_PRIORITY_REQUEST: 'UPDATE_DUTY_PRIORITY_REQUEST',
    UPDATE_DUTY_PRIORITY_SUCCESS: 'UPDATE_DUTY_PRIORITY_SUCCESS',
    UPDATE_DUTY_PRIORITY_FAILURE: 'UPDATE_DUTY_PRIORITY_FAILURE',

    DELETE_DUTY_PRIORITY_REQUEST: 'DELETE_DUTY_PRIORITY_REQUEST',
    DELETE_DUTY_PRIORITY_SUCCESS: 'DELETE_DUTY_PRIORITY_SUCCESS',
    DELETE_DUTY_PRIORITY_FAILURE: 'DELETE_DUTY_PRIORITY_FAILURE',

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
    sizeId: number;
    size: DutySize;
    priorityId: number;
    priority: DutyPriority;
    categoryId: number;
    category: DutyCategory;
    projectId: number;
    project: Project;
    completed: boolean;
    order: number;
}

export interface DutyCategory {
    id: number;
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
    duty: Duty | object;
    dutyCategories: DutyCategory[];
    dutyCategory: DutyCategory | object;
    dutyPriorities: DutyPriority[];
    dutyPriority: DutyPriority | object;
    dutySizes: DutySize[];
    dutySize: DutySize | object;
    loading: boolean;
    error: string | null;
    status: string | null;
}
export interface DutyAction {
    type: string;
    payload: Duty | Duty[] | DutyCategory | DutyCategory[] | DutyPriority | DutyPriority[] | DutySize | DutySize[] | string | number | null;
}

export interface DutyStateProps {
    dutyState: DutyState;
}

export interface DutyDispatchProps {
    getDuties: () => void;
    getDuty: (id: number) => void;
    createDuty: (duty: Duty) => void;
    updateDuty: (duty: Duty) => void;
    deleteDuty: (id: number) => void;
    getDutyCategories: () => void;
    getDutyCategory: (id: number) => void;
    createDutyCategory: (dutyCategory: DutyCategory) => void;
    updateDutyCategory: (dutyCategory: DutyCategory) => void;
    deleteDutyCategory: (id: number) => void;
    getDutyPriorities: () => void;
    getDutyPriority: (id: number) => void;
    createDutyPriority: (dutyPriority: DutyPriority) => void;
    updateDutyPriority: (dutyPriority: DutyPriority) => void;
    deleteDutyPriority: (id: number) => void;
    getDutySizes: () => void;
    getDutySize: (id: number) => void;
    createDutySize: (dutySize: DutySize) => void;
    updateDutySize: (dutySize: DutySize) => void;
    deleteDutySize: (id: number) => void;
}

export type DutyProps = DutyStateProps & DutyDispatchProps;






