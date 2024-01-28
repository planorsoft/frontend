import { UserAction, UserState, userTypes } from "./types";

const userInitalState: UserState = {
  users: [],
  user: {
    email: "",
    name: "",
    avatarUri: "",
    roleName: "",
  },
  loading: false,
  error: null,
  status: null,
};

export const userReducer = (state = userInitalState, action: UserAction) => {
  switch (action.type) {
    case userTypes.GET_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
        status: userTypes.GET_TEAM_REQUEST,
      };
    case userTypes.GET_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        status: userTypes.GET_TEAM_SUCCESS,
        users: action.payload,
      };
    case userTypes.GET_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        status: userTypes.GET_TEAM_FAILURE,
        error: action.payload,
      };
    case userTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        status: userTypes.GET_USER_REQUEST,
      };
    case userTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: userTypes.GET_USER_SUCCESS,
        user: action.payload,
      };
    case userTypes.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        status: userTypes.GET_USER_FAILURE,
        error: action.payload,
      };
    case userTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        status: userTypes.CREATE_USER_REQUEST,
      };
    case userTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: userTypes.CREATE_USER_SUCCESS,
        users: [...state.users, action.payload],
      };
    case userTypes.CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        status: userTypes.CREATE_USER_FAILURE,
        error: action.payload,
      };
    case userTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        status: userTypes.UPDATE_USER_REQUEST,
      };
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: userTypes.UPDATE_USER_SUCCESS,
        users: state.users.map((user) => user.email === action.payload.email ? {
          ...user,
          email: action.payload.email,
          name: action.payload.name,
        } : user),
      };
    case userTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        status: userTypes.UPDATE_USER_FAILURE,
        error: action.payload,
      };
    case userTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        status: userTypes.DELETE_USER_REQUEST,
      };
    case userTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        status: userTypes.DELETE_USER_SUCCESS,
        users: state.users.filter((user) => user.email !== action.payload),
      };
    case userTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        status: userTypes.DELETE_USER_FAILURE,
        error: action.payload,
      };
    case userTypes.RESET_TEAM_STATUS:
      return {
        ...state,
        loading: false,
        status: null,
        error: null,
      };
    default:
      return state;
  }
};
