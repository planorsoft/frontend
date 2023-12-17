export const identityTypes = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

  CONFIRM_REQUEST: "CONFIRM_REQUEST",
  CONFIRM_SUCCESS: "CONFIRM_SUCCESS",
  CONFIRM_FAILURE: "CONFIRM_FAILURE",

  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",

  FORGOT_CONFIRM_PASSWORD_REQUEST: "FORGOT_CONFIRM_PASSWORD_REQUEST",
  FORGOT_CONFIRM_PASSWORD_SUCCESS: "FORGOT_CONFIRM_PASSWORD_SUCCESS",
  FORGOT_CONFIRM_PASSWORD_FAILURE: "FORGOT_CONFIRM_PASSWORD_FAILURE",

  SET_TOKEN: "SET_TOKEN",
  SET_TOKEN_FAILURE: "SET_TOKEN_FAILURE",

  RESET_IDENTITY_ERROR: "RESET_IDENTITY_ERROR",
  RESET_MESSAGE: "RESET_MESSAGE"
};

export interface IdentityState {
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isVerified: boolean;
  status: string;
  token: string | null;
  user: object;
}

export interface IdentityAction {
  type: string;
  payload: IdentityState | null;
}

export interface LoginData {
  email: string;
  password: string;
  tenant: string
}

export interface RegisterData {
  name: string;
  username: string;
  tenant: string;
  role: string;
  email: string;
  password: string;
}

export interface ConfirmData {
  email: string;
  token: string;
  tenant: string;
}

export interface ForgotPasswordData {
  email: string;
  tenant: string;
}

export interface ForgotConfirmPasswordData {
  email: string;
  token: string;
  password: string;
  tenant: string;
}

export interface SetTokenData {
  token: string;
}

export interface IdentityStateProps {
  identity: IdentityState;
}

export interface IdentityDispatchProps {
  login: (data: LoginData) => void;
  register: (data: RegisterData) => void;
  confirm: (data: ConfirmData) => void;
  forgotPassword: (data: ForgotPasswordData) => void;
  forgotConfirmPassword: (data: ForgotConfirmPasswordData) => void;
  setToken: (data: SetTokenData) => void;
  resetMessage: () => void;
}

export type IdentityProps = IdentityStateProps & IdentityDispatchProps;