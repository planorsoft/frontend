import { CurrentUserAction, CurrentUserState, currentUserTypes } from "./types";

const currentUserInitalState: CurrentUserState = {
    user: {
        name: '',
        email: '',
        avatarUri: null,
    },
    loading: false,
    error: null,
    status: null,
};

export const currentUserReducer = (state = currentUserInitalState, action: CurrentUserAction) => {
    switch (action.type) {
        case currentUserTypes.GET_MY_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case currentUserTypes.GET_MY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            };
        case currentUserTypes.GET_MY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case currentUserTypes.UPDATE_MY_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case currentUserTypes.UPDATE_MY_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: { ...state.user, name: action.payload.name },
                status: currentUserTypes.UPDATE_MY_USER_SUCCESS
            };
        case currentUserTypes.UPDATE_MY_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                status: currentUserTypes.UPDATE_MY_USER_FAILURE
            };
        case currentUserTypes.UPDATE_AVATAR_REQUEST:
            return {
                ...state,
                loading: true
            };
        case currentUserTypes.UPDATE_AVATAR_SUCCESS:
            return {
                ...state,
                loading: false,
                user: { ...state.user, avatarUri: action.payload }, status: currentUserTypes.UPDATE_AVATAR_SUCCESS
            };
        case currentUserTypes.UPDATE_AVATAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case currentUserTypes.DELETE_AVATAR_REQUEST:
            return {
                ...state,
                loading: true
            };
        case currentUserTypes.DELETE_AVATAR_SUCCESS:
            return {
                ...state,
                loading: false,
                user: { ...state.user, avatarUri: null }
            };
        case currentUserTypes.DELETE_AVATAR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case currentUserTypes.GET_TEAM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case currentUserTypes.GET_TEAM_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case currentUserTypes.GET_TEAM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}