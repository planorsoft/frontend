import { PaginatedList, Pagination } from "@/lib/types";

export const projectTypes = {
    GET_PROJECTS_REQUEST: 'GET_PROJECTS_REQUEST',
    GET_PROJECTS_SUCCESS: 'GET_PROJECTS_SUCCESS',
    GET_PROJECTS_FAILURE: 'GET_PROJECTS_FAILURE',

    GET_PROJECT_REQUEST: 'GET_PROJECT_REQUEST',
    GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
    GET_PROJECT_FAILURE: 'GET_PROJECT_FAILURE',

    CREATE_PROJECT_REQUEST: 'CREATE_PROJECT_REQUEST',
    CREATE_PROJECT_SUCCESS: 'CREATE_PROJECT_SUCCESS',
    CREATE_PROJECT_FAILURE: 'CREATE_PROJECT_FAILURE',

    UPDATE_PROJECT_REQUEST: 'UPDATE_PROJECT_REQUEST',
    UPDATE_PROJECT_SUCCESS: 'UPDATE_PROJECT_SUCCESS',
    UPDATE_PROJECT_FAILURE: 'UPDATE_PROJECT_FAILURE',

    DELETE_PROJECT_REQUEST: 'DELETE_PROJECT_REQUEST',
    DELETE_PROJECT_SUCCESS: 'DELETE_PROJECT_SUCCESS',
    DELETE_PROJECT_FAILURE: 'DELETE_PROJECT_FAILURE',

    RESET_PROJECT_STATUS: 'RESET_PROJECT_STATUS',
}


export interface Project {
    id?: number;
    title: string;
    isCompleted: boolean;
    customerId: number;
    description: string | null;
    price: number;
}

export interface ProjectState {
    projects: Project[];
    project?: Project;
    loading: boolean;
    error: string | null;
    status: string | null;
    pagination: Pagination;
}

export interface ProjectAction {
    type: string;
    payload: Project | Project[] | PaginatedList<Project> | string;
}

export interface ProjectPayload extends Project { }