import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRMED_PASSWORD_CHANGED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_IN_PROGRESS,
  USER_LOG_OUT,
  USER_SIGN_UP_CANCEL,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAILED,
  USER_SIGN_UP_IN_PROGRESS,
  USER_AUTH_PAGE_CLEAN_UP,
  USER_SEND_RESET_PASSWORD_EMAIL_IN_PROGRESS,
  USER_SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  USER_SEND_RESET_PASSWORD_EMAIL_FAILED
} from "../values/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmedPassword: "",
  confirmedToken: "",
  user: null,
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: "" };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONFIRMED_PASSWORD_CHANGED:
      return { ...state, confirmedPassword: action.payload };
    case USER_LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case USER_LOGIN_FAIL:
    case USER_SIGN_UP_FAILED:
    case USER_SEND_RESET_PASSWORD_EMAIL_FAILED:
      return {
        ...state,
        error: action.payload || "Authentication Failed.",
        password: "",
        confirmedPassword: "",
        loading: false
      };
    case USER_LOGIN_IN_PROGRESS:
    case USER_SIGN_UP_IN_PROGRESS:
    case USER_SEND_RESET_PASSWORD_EMAIL_IN_PROGRESS:
      return { ...state, loading: true };
    case USER_LOG_OUT:
    case USER_SIGN_UP_CANCEL:
    case USER_SIGN_UP_SUCCESS:
    case USER_AUTH_PAGE_CLEAN_UP:
    case USER_SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
