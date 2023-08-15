import axios from "@/utils/axios";
import identityTypes from "@/containers/Identity/types";
import { setAuthToken } from "@/utils/axios";
import jwtDecoder from "@/utils/jwtDecoder";
import store from "@/store";

// ------------------------------------ AUTH ------------------------------------

export const setToken = (token = null) => {
  // If token is gived by parameter
  if (token !== null) {
    setAuthToken(token);
    localStorage.setItem("token", token);
    const data = {
      token,
      user: jwtDecoder(token),
    };
    return {
      type: identityTypes.SET_TOKEN,
      payload: data,
    };
  }

  // Lookup localStorage
  const tokenFromLocalStorage = localStorage.getItem("token");
  if (tokenFromLocalStorage !== null) {
    setAuthToken(tokenFromLocalStorage);
    const data = {
      tokenFromLocalStorage,
      user: jwtDecoder(tokenFromLocalStorage),
    };
    return {
      type: identityTypes.SET_TOKEN,
      payload: data,
    };
  }

  // Lookup store
  const tokenFromStore = store.getState().identity.token;
  if (tokenFromStore !== null) {
    setAuthToken(tokenFromStore);
    const data = {
      tokenFromStore,
      user: jwtDecoder(tokenFromStore),
    };
    return {
      type: identityTypes.SET_TOKEN,
      payload: data,
    };
  } else {
    return {
      type: identityTypes.SET_TOKEN_FAILURE,
    };
  }
};

export const resetToken = () => {
  localStorage.removeItem("token");
  setAuthToken();
  return {
    type: identityTypes.SET_TOKEN_FAILURE,
  };
};

// ------------------------------------ LOGIN ------------------------------------

const loginRequest = () => ({
  type: identityTypes.LOGIN_REQUEST,
});

const loginSuccess = (data) => ({
  type: identityTypes.LOGIN_SUCCESS,
  payload: data,
});

const loginFailure = (error) => ({
  type: identityTypes.LOGIN_FAILURE,
  payload: error,
});

export const login = (email, password, tenant) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post("/identity/login", {
      email,
      password,
      tenant,
    });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.detail));
  }
};

// ------------------------------------ REGISTER ------------------------------------

const registerRequest = () => ({
  type: identityTypes.REGISTER_REQUEST,
});

const registerSuccess = (data) => ({
  type: identityTypes.REGISTER_SUCCESS,
  payload: data,
});

const registerFailure = (error) => ({
  type: identityTypes.REGISTER_FAILURE,
  payload: error,
});

export const register = (model) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post("/identity/register", model);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailure(error.response.data.detail));
  }
};

// ------------------------------------ CONFIRM ------------------------------------

const confirmRequest = () => ({
  type: identityTypes.CONFIRM_REQUEST,
});

const confirmSuccess = (data) => ({
  type: identityTypes.CONFIRM_SUCCESS,
  payload: data,
});

const confirmFailure = (error) => ({
  type: identityTypes.CONFIRM_FAILURE,
  payload: error,
});

export const confirm = (email, code) => async (dispatch) => {
  dispatch(confirmRequest());
  try {
    const { data } = await axios.post("/identity/confirm", { email, code });
    dispatch(confirmSuccess(data));
  } catch (error) {
    dispatch(confirmFailure(error.response.data.detail));
  }
};

// ------------------------------------ FORGOT PASSWORD ------------------------------------

const forgotPasswordRequest = () => ({
  type: identityTypes.FORGOT_PASSWORD_REQUEST,
});

const forgotPasswordSuccess = (data) => ({
  type: identityTypes.FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

const forgotPasswordFailure = (error) => ({
  type: identityTypes.FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPassword = (email, tenant) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const { data } = await axios.post("/identity/forgot", { email, tenant });
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFailure(error.response.data.detail));
  }
};

// ------------------------------------ FORGOT CONFIRM PASSWORD ------------------------------------

const forgotConfirmPasswordRequest = () => ({
  type: identityTypes.FORGOT_CONFIRM_PASSWORD_REQUEST,
});

const forgotConfirmPasswordSuccess = (data) => ({
  type: identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS,
  payload: data,
});

const forgotConfirmPasswordFailure = (error) => ({
  type: identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE,
  payload: error,
});

export const forgotConfirmPassword =
  (email, token, password, tenant) => async (dispatch) => {
    dispatch(forgotConfirmPasswordRequest());
    try {
      const { data } = await axios.post("/identity/forgot-confirm", {
        email,
        token,
        password,
        tenant,
      });
      dispatch(forgotConfirmPasswordSuccess(data));
    } catch (error) {
      dispatch(forgotConfirmPasswordFailure(error.response.data.detail));
    }
  };

// ------------------------------------ RESET MESSAGE ------------------------------------

export const resetMessage = () => ({
  type: identityTypes.RESET_MESSAGE,
});
