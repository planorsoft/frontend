import { Customer } from "@/containers/Customer/types";

export const userTypes = {
  GET_TEAM_REQUEST: "GET_TEAM_REQUEST",
  GET_TEAM_SUCCESS: "GET_TEAM_SUCCESS",
  GET_TEAM_FAILURE: "GET_TEAM_FAILURE",

  GET_USER_REQUEST: "GET_USER_REQUEST",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_FAILURE: "GET_USER_FAILURE",

  CREATE_USER_REQUEST: "CREATE_USER_REQUEST",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILURE: "CREATE_USER_FAILURE",

  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",

  DELETE_USER_REQUEST: "DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE",

  RESET_TEAM_STATUS: "RESET_TEAM_STATUS",
};



export interface User {
  email: string;
  name: string;
  avatarUri?: string;
  roleName?: string;
  password?: string;
  customer: Customer;
}

export interface UserState {
  users: User[];
  user: User;
  loading: boolean;
  error: string | null;
  status: string | null;
}

export interface UserAction {
  type: string;
  payload: User | User[] | string;
}

export interface UserPayload {
  id?: number;
  code: string;
  symbol?: string;
  rate: number;
}
