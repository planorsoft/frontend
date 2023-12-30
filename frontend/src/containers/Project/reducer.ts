import { PaginatedList } from "@/lib/types";
import { Project, ProjectAction, ProjectState, projectTypes } from "./types";


export const projectInitialState: ProjectState = {
    projects: [],
    project: undefined,
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

export const projectReducer = (state = projectInitialState, action: ProjectAction) => {
    switch (action.type) {
        case projectTypes.GET_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true,
                status: projectTypes.GET_PROJECTS_REQUEST
            };
        case projectTypes.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: (action.payload as PaginatedList<Project>).items,
                status: projectTypes.GET_PROJECTS_SUCCESS,
                pagination: {
                    pageNumber: (action.payload as PaginatedList<Project>).pageNumber,
                    totalPages: (action.payload as PaginatedList<Project>).totalPages,
                    totalCount: (action.payload as PaginatedList<Project>).totalCount,
                    hasPreviousPage: (action.payload as PaginatedList<Project>).hasPreviousPage,
                    hasNextPage: (action.payload as PaginatedList<Project>).hasNextPage,
                }
            };
        case projectTypes.GET_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: projectTypes.GET_PROJECTS_FAILURE
            };
        case projectTypes.GET_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                status: projectTypes.GET_PROJECT_REQUEST
            };
        case projectTypes.GET_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                project: action.payload,
                status: projectTypes.GET_PROJECT_SUCCESS
            };
        case projectTypes.GET_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: projectTypes.GET_PROJECT_FAILURE
            };
        case projectTypes.CREATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                status: projectTypes.CREATE_PROJECT_REQUEST
            };
        case projectTypes.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: [...state.projects, action.payload],
                status: projectTypes.CREATE_PROJECT_SUCCESS
            };
        case projectTypes.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: projectTypes.CREATE_PROJECT_FAILURE
            };
        case projectTypes.UPDATE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                status: projectTypes.UPDATE_PROJECT_REQUEST
            };
        case projectTypes.UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: state.projects.map((project) => {
                    if (project.id === (action.payload as Project).id) {
                        return action.payload as Project;
                    }
                    return project;
                }),
                status: projectTypes.UPDATE_PROJECT_SUCCESS
            };
        case projectTypes.UPDATE_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: projectTypes.UPDATE_PROJECT_FAILURE
            };
        case projectTypes.DELETE_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                status: projectTypes.DELETE_PROJECT_REQUEST
            };
        case projectTypes.DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: state.projects.filter((project) => project.id !== action.payload),
                status: projectTypes.DELETE_PROJECT_SUCCESS
            };
        case projectTypes.DELETE_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: projectTypes.DELETE_PROJECT_FAILURE
            };
        case projectTypes.RESET_PROJECT_STATUS:
            return {
                ...state,
                status: null
            };
        default:
            return state;
    }
}