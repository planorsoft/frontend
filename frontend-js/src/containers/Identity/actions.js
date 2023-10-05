import axios from "@/utils/axios";
import identityTypes from "@/containers/Identity/types";
import jwtDecoder from "@/utils/jwtDecoder";
import store from "@/store";

export const setToken = (token = null) => {
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

  // Lookup store
  const tokenFromStore = store.getState().identity.token;
  if (tokenFromStore !== null) {
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
  return {
    type: identityTypes.SET_TOKEN_FAILURE,
  };
};

export const login = (email, password, tenant) => async (dispatch) => {
  dispatch({ type: identityTypes.LOGIN_REQUEST });
  try {
    const { data } = await axios.post("/identity/login", {
      email,
      password,
      tenant,
    });
    dispatch({ type: identityTypes.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: identityTypes.LOGIN_FAILURE,
      payload: error.response.data.detail,
    });
  }
};

export const register = (name, email, password, tenant, role) => async (dispatch) => {
    dispatch({ type: identityTypes.REGISTER_REQUEST });
    try {
      const { data } = await axios.post("/identity/register", {
        name,
        email,
        password,
        tenant,
        role,
      });
      dispatch({ type: identityTypes.REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: identityTypes.REGISTER_FAILURE,
        payload: error.response.data.detail,
      });
    }
  };

export const confirm = (email, token, tenant) => async (dispatch) => {
  dispatch({ type: identityTypes.CONFIRM_REQUEST });
  try {
    const { data } = await axios.post("/identity/confirm", {
      email,
      token,
      tenant,
    });
    dispatch({ type: identityTypes.CONFIRM_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: identityTypes.CONFIRM_FAILURE,
      payload: error.response.data.detail,
    });
  }
};


export const forgotPassword = (email, tenant) => async (dispatch) => {
  dispatch({ type: identityTypes.FORGOT_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/identity/forgot", {
      email,
      tenant,
    });
    dispatch({ type: identityTypes.FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: identityTypes.FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.detail,
    });
  }
};

export const forgotConfirmPassword = (email, token, password, tenant) => async (dispatch) => {
  dispatch({ type: identityTypes.FORGOT_CONFIRM_PASSWORD_REQUEST });
  try {
    const { data } = await axios.post("/identity/forgot/confirm", {
      email,
      token,
      password,
      tenant,
    });
    dispatch({ type: identityTypes.FORGOT_CONFIRM_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: identityTypes.FORGOT_CONFIRM_PASSWORD_FAILURE,
      payload: error.response.data.detail,
    });
  }
};

export const resetMessage = () => ({
  type: identityTypes.RESET_MESSAGE,
});
