import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CONFIRM_REQUEST,
  CONFIRM_SUCCESS,
  CONFIRM_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_CONFIRM_PASSWORD_REQUEST,
  FORGOT_CONFIRM_PASSWORD_SUCCESS,
  FORGOT_CONFIRM_PASSWORD_FAILURE,
  SET_TOKEN,
  SET_TOKEN_FAILURE,
  RESET_MESSAGE,
} from "@/containers/Identity/types";
import { identityStatuses } from "@/constants/identity";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {},
  status: "",
  error: null,
  loading: false,
  isVerified: false,
};

const identityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case SET_TOKEN_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.accessToken,
        status: identityStatuses.LoginSuccess,
        error: null,
        loading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        status: identityStatuses.LoginFailure,
        loading: false,
        isAuthenticated: false,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: identityStatuses.RegisterSuccess,
        error: null,
        loading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        status: identityStatuses.RegisterFailure,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_SUCCESS:
      return {
        ...state,
        status: identityStatuses.ConfirmSuccess,
        error: null,
        loading: false,
        isVerified: true,
      };
    case CONFIRM_FAILURE:
      return {
        ...state,
        status: identityStatuses.ConfirmFailure,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        status: identityStatuses.ForgotPasswordSuccess,
        error: null,
        loading: false,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        status: identityStatuses.ForgotPasswordFailure,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case FORGOT_CONFIRM_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_CONFIRM_PASSWORD_SUCCESS:
      return {
        ...state,
        status: identityStatuses.ForgotConfirmPasswordSuccess,
        error: null,
        loading: false,
      };
    case FORGOT_CONFIRM_PASSWORD_FAILURE:
      return {
        ...state,
        status: identityStatuses.ForgotConfirmPasswordFailure,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default identityReducer;
