import axios from "@/lib/axios";
import { ConfirmData, ForgotConfirmPasswordData, ForgotPasswordData, LoginData, RegisterData, identityTypes } from "@/containers/Identity/types";
import jwtDecoder from "@/lib/jwtDecoder";
import { AppDispatch } from "@/store";
import { AxiosError } from "axios";

export const setToken = (token : string | null = null) => {
  // If token is gived by parameter
  if (token !== null) {
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
    const data = {
      tokenFromLocalStorage,
      user: jwtDecoder(tokenFromLocalStorage),
    };
    return {
      type: identityTypes.SET_TOKEN,
      payload: data,
    };
  }

  return {
    type: identityTypes.SET_TOKEN_FAILURE,
  };
};

export const resetToken = () => {
  localStorage.removeItem("token");
  return {
    type: identityTypes.SET_TOKEN_FAILURE,
  };
};

export const login = ({email, password, tenant} : LoginData) => async (dispatch : AppDispatch) => {
  dispatch({ type: identityTypes.LOGIN_REQUEST, payload: null });
  try {
    const { data } = await axios.post("/identity/login", {
      email,
      password,
      tenant,
    });
    dispatch(setToken(data.accessToken))
    dispatch({ type: identityTypes.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    if(!(error instanceof AxiosError)) { throw error; }

    dispatch({
      type: identityTypes.LOGIN_FAILURE,
      payload: error.response?.data.detail,
    });
  }
};

export const register = ({name, email, username, password, tenant, role} : RegisterData) => async (dispatch : AppDispatch) => {
    dispatch({ type: identityTypes.REGISTER_REQUEST, payload: null });
    try {
      const { data } = await axios.post("/identity/register", {
        name,
        email,
        username,
        password,
        tenant,
        role,
      });
      dispatch({ type: identityTypes.REGISTER_SUCCESS, payload: data });
    } catch (error) {
        if(!(error instanceof AxiosError)) { throw error; }

      dispatch({
        type: identityTypes.REGISTER_FAILURE,
        payload: error.response?.data.detail,
      });
    }
  };

export const confirm = ({email, token, tenant} : ConfirmData) => async (dispatch : AppDispatch) => {
  dispatch({ type: identityTypes.CONFIRM_REQUEST, payload: null });
  try {
    const { data } = await axios.post("/identity/confirm", {
      email,
      token,
      tenant,
    });
    dispatch({ type: identityTypes.CONFIRM_SUCCESS, payload: data });
  } catch (error) {
    if(!(error instanceof AxiosError)) { throw error; }
    
    dispatch({
      type: identityTypes.CONFIRM_FAILURE,
      payload: error.response?.data.detail,
    });
  }
};


export const forgotPassword = ({email, tenant}: ForgotPasswordData) => async (dispatch: AppDispatch) => {
  dispatch({ type: identityTypes.FORGOT_PASSWORD_REQUEST, payload: null });
  try {
    const { data } = await axios.post("/identity/forgot", {
      email,
      tenant,
    });
    dispatch({ type: identityTypes.FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
        if(!(error instanceof AxiosError)) { throw error; }
        dispatch({
      type: identityTypes.FORGOT_PASSWORD_FAILURE,
      payload: error.response?.data.detail,
    });
  }
};

export const forgotConfirmPassword = ({email, token, password, tenant} : ForgotConfirmPasswordData) => async (dispatch: AppDispatch) => {
  dispatch({ type: identityTypes.FORGOT_CONFIRM_PASSWORD_REQUEST, payload: null });
  try {
    const { data } = await axios.post("/identity/forgot/confirm", {
      email,
      token,
      password,
      tenant,
    });
    dispatch({ type: identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
        if(!(error instanceof AxiosError)) { throw error; }
        dispatch({
      type: identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE,
      payload: error.response?.data.detail,
    });
  }
};

export const resetMessage = () => ({
  type: identityTypes.RESET_MESSAGE,
});
