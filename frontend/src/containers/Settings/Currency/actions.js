import currencyTypes from "@/containers/Settings/Currency/types";
import axios from "@/utils/axios";

export const getCurrencyList = () => async (dispatch) => {
  try {
    dispatch({ type: currencyTypes.GET_CURRENCY_LIST_REQUEST });
    const { data } = await axios.get(`/currencies`);
    dispatch({ type: currencyTypes.GET_CURRENCY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: currencyTypes.GET_CURRENCY_LIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getCurrencyListIfEmpty = () => async (dispatch, getState) => {
  const { currencies } = getState().currency;
  if (currencies.length === 0) {
    dispatch(getCurrencyList());
  }
};

export const getCurrency = (currencyId) => {
  return {
    type: currencyTypes.GET_CURRENCY,
    payload: currencyId,
  }
};

export const createCurrency = (currency) => async (dispatch) => {
  try {
    dispatch({ type: currencyTypes.CREATE_CURRENCY_REQUEST });
    const { data } = await axios.post(`/currencies`, currency);
    dispatch({ type: currencyTypes.CREATE_CURRENCY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: currencyTypes.CREATE_CURRENCY_FAILURE,
      payload: error.response.data,
    });
  }
};

export const updateCurrency = (id, currency) => async (dispatch) => {
  try {
    dispatch({ type: currencyTypes.UPDATE_CURRENCY_REQUEST });
    const { data } = await axios.put(`/currencies/${id}`, currency);
    dispatch({ type: currencyTypes.UPDATE_CURRENCY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: currencyTypes.UPDATE_CURRENCY_FAILURE,
      payload: error.response.data,
    });
  }
};

export const deleteCurrency = (currencyId) => async (dispatch) => {
  try {
    dispatch({ type: currencyTypes.DELETE_CURRENCY_REQUEST });
    await axios.delete(`/currencies/${currencyId}`);
    dispatch({ type: currencyTypes.DELETE_CURRENCY_SUCCESS, payload: currencyId });
  } catch (error) {
    dispatch({
      type: currencyTypes.DELETE_CURRENCY_FAILURE,
      payload: error.response.data,
    });
  }
};
