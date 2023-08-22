import axios from "@/utils/axios";
import customerTypes from "@/containers/Customers/types";
import store from "@/store";

export const getCustomerList = (page, isPotential) => async (dispatch) => {
  try {
    dispatch({ type: customerTypes.GET_CUSTOMER_LIST_REQUEST });
    const pageNumber = page;
    const pageSize = store.getState().customer.pageSize;
    const { data } = await axios.get(
      `/customers?pageNumber=${pageNumber}&pageSize=${pageSize}&isPotential=${isPotential}`
    );
    dispatch({ type: customerTypes.GET_CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: customerTypes.GET_CUSTOMER_LIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: customerTypes.GET_CUSTOMER_REQUEST });
    const { data } = await axios.get(`/customers/${id}`);
    dispatch({ type: customerTypes.GET_CUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: customerTypes.GET_CUSTOMER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const createCustomer = (customer) => async (dispatch) => {
  try {
    dispatch({ type: customerTypes.CREATE_CUSTOMER_REQUEST });
    const { response } = await axios.post("/customers", customer);
    if (response.status === 400) {
      dispatch({
        type: customerTypes.CREATE_CUSTOMER_FAILURE,
        payload: response.data.detail,
      });
    } else {
      dispatch({ type: customerTypes.CREATE_CUSTOMER_SUCCESS });
    }
  } catch (error) {
    dispatch({
      type: customerTypes.CREATE_CUSTOMER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const updateCustomer = (id, customer) => async (dispatch) => {
  try {
    dispatch({ type: customerTypes.UPDATE_CUSTOMER_REQUEST });
    await axios.put(`/customers/${id}`, customer);
    dispatch({ type: customerTypes.UPDATE_CUSTOMER_SUCCESS, payload: customer, id: id });
  } catch (error) {
    dispatch({
      type: customerTypes.UPDATE_CUSTOMER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: customerTypes.DELETE_CUSTOMER_REQUEST });
    await axios.delete(`/customers/${id}`);
    dispatch({ type: customerTypes.DELETE_CUSTOMER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: customerTypes.DELETE_CUSTOMER_FAILURE,
      payload: error.response.data,
    });
  }
};