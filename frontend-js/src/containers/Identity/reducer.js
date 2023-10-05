import identityTypes from "@/containers/Identity/types";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: {},
  status: null,
  error: null,
  loading: false,
  isVerified: false,
};

const identityReducer = (state = initialState, action) => {
  switch (action.type) {
    case identityTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        status: identityTypes.SET_TOKEN
      };
    case identityTypes.SET_TOKEN_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        status: identityTypes.SET_TOKEN_FAILURE
      };
    case identityTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        status: identityTypes.LOGIN_REQUEST
      };
    case identityTypes.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.accessToken,
        error: null,
        loading: false,
        isAuthenticated: true,
        status: identityTypes.LOGIN_SUCCESS
      };
    case identityTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
        status: identityTypes.LOGIN_FAILURE
      };
    case identityTypes.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        status: identityTypes.REGISTER_REQUEST
      };
    case identityTypes.REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        status: identityTypes.REGISTER_SUCCESS
      };
    case identityTypes.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
        status: identityTypes.REGISTER_FAILURE
      };
    case identityTypes.CONFIRM_REQUEST:
      return {
        ...state,
        loading: true,
        status: identityTypes.CONFIRM_REQUEST
      };
    case identityTypes.CONFIRM_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isVerified: true,
        status: identityTypes.CONFIRM_SUCCESS
      };
    case identityTypes.CONFIRM_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
        status: identityTypes.CONFIRM_FAILURE
      };
    case identityTypes.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        status: identityTypes.FORGOT_PASSWORD_REQUEST
      };
    case identityTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        status: identityTypes.FORGOT_PASSWORD_SUCCESS
      };
    case identityTypes.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
        status: identityTypes.FORGOT_PASSWORD_FAILURE
      };
    case identityTypes.FORGOT_CONFIRM_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        status: identityTypes.FORGOT_CONFIRM_PASSWORD_REQUEST
      };
    case identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        status: identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS
      };
    case identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        isAuthenticated: false,
        status: identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE
      };
    case identityTypes.RESET_MESSAGE:
      return {
        ...state,
        message: null,
        status: null
      };
    default:
      return state;
  }
};

export default identityReducer;
