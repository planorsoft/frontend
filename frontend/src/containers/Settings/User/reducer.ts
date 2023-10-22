import { userTypes, UserAction, UserState } from "./types";


const userInitalState: UserState = {
    user: {
        name: '',
        email: '',
        avatarUri: null,
    },
    loading: false,
    error: null,
    status: null,
};

export const userReducer = (state = userInitalState, action: UserAction) => {
    switch (action.type) {
        case userTypes.GET_MY_USER_REQUEST:
            return { ...state, loading: true };
        case userTypes.GET_MY_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case userTypes.GET_MY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case userTypes.UPDATE_MY_USER_REQUEST:
            return { ...state, loading: true };
        case userTypes.UPDATE_MY_USER_SUCCESS:
            return { ...state, loading: false, user: { ...state.user, name: action.payload.name }, status: userTypes.UPDATE_MY_USER_SUCCESS };
        case userTypes.UPDATE_MY_USER_FAILURE:
            return { ...state, loading: false, error: action.payload, status: userTypes.UPDATE_MY_USER_FAILURE };
        case userTypes.UPDATE_AVATAR_REQUEST:
            return { ...state, loading: true };
        case userTypes.UPDATE_AVATAR_SUCCESS:
            return { ...state, loading: false, user: { ...state.user, avatarUri: action.payload }, status: userTypes.UPDATE_AVATAR_SUCCESS };
        case userTypes.UPDATE_AVATAR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case userTypes.DELETE_AVATAR_REQUEST:
            return { ...state, loading: true };
        case userTypes.DELETE_AVATAR_SUCCESS:
            return { ...state, loading: false, user: { ...state.user, avatarUri: null } };
        case userTypes.DELETE_AVATAR_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}