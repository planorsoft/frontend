import axios from "@/utils/axios";
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
} from "./types";
import { setAuthToken } from "@/utils/axios";
import jwtDecoder from "@/utils/jwtDecoder";

// ------------------------------------ AUTH ------------------------------------

export const setToken = (token = null) => {
  if (token !== null) {
    setAuthToken(token);
    localStorage.setItem("token", token);
    const data = {
      token,
      user: jwtDecoder(token),
    };
    return {
      type: SET_TOKEN,
      payload: data,
    };
  }

  token = localStorage.getItem("token");

  if (token !== null) {
    setAuthToken(token);
    const data = {
      token,
      user: jwtDecoder(token),
    };
    return {
      type: SET_TOKEN,
      payload: data,
    };
  } else {
    return {
      type: SET_TOKEN_FAILURE,
    };
  }
};

export const resetToken = () => {
  localStorage.removeItem("token");
  setAuthToken();
  return {
    type: SET_TOKEN_FAILURE,
  };
};

// ------------------------------------ LOGIN ------------------------------------

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (email, password, tenant, navigate) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post("/identity/login", {
      email,
      password,
      tenant,
    });
    navigate("/");
    dispatch(loginSuccess(data));
    dispatch(setToken(data.accessToken));
  } catch (error) {
    dispatch(loginFailure(error.response.data.detail));
  }
};

// ------------------------------------ REGISTER ------------------------------------

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
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

export const confirmRequest = () => ({
  type: CONFIRM_REQUEST,
});

export const confirmSuccess = (data) => ({
  type: CONFIRM_SUCCESS,
  payload: data,
});

export const confirmFailure = (error) => ({
  type: CONFIRM_FAILURE,
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

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});

export const forgotPassword = (email, tenant, toast) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const { data } = await axios.post("/identity/forgot", { email, tenant });
    dispatch(forgotPasswordSuccess(data));
    toast({
      title: "Şifre sıfırlama linki mail adresine gönderildi.",
      position: "bottom-right",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  } catch (error) {
    dispatch(forgotPasswordFailure(error.response.data.detail));
  }
};


// ------------------------------------ FORGOT CONFIRM PASSWORD ------------------------------------

export const forgotConfirmPasswordRequest = () => ({
  type: FORGOT_CONFIRM_PASSWORD_REQUEST,
});

export const forgotConfirmPasswordSuccess = (data) => ({
  type: FORGOT_CONFIRM_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotConfirmPasswordFailure = (error) => ({
  type: FORGOT_CONFIRM_PASSWORD_FAILURE,
  payload: error,
});

export const forgotConfirmPassword = (email, token, password, tenant, toast) => async (dispatch) => {
  dispatch(forgotConfirmPasswordRequest());
  try {
    const { data } = await axios.post("/identity/forgot-confirm", { email, token, password, tenant });
    dispatch(forgotConfirmPasswordSuccess(data));
    toast({
      title: "Şifreniz başarıyla sıfırlandı, giriş yapabilirsiniz.",
      position: "bottom-right",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  } catch (error) {
    dispatch(forgotConfirmPasswordFailure(error.response.data.detail));
  }
};

// ------------------------------------ RESET MESSAGE ------------------------------------

export const resetMessage = () => ({
  type: RESET_MESSAGE,
});