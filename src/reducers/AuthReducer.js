import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRMED_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGGIN_IN,
  LOG_OUT,
  CANCEL_SIGN_UP,
  USER_CREATE_SIGN_UP,
  USER_CREATE_FAIL_SIGN_UP,
  USER_CREATE_IN_PROGRESS_SIGN_UP,
  CLEAN_UP
} from "../values/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmedPassword: "",
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
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed.",
        password: "",
        confirmedPassword: "",
        loading: false
      };
    case LOGGGIN_IN:
      return { ...state, loading: true };
    case LOG_OUT:
      return { ...state, ...INITIAL_STATE };
    case CANCEL_SIGN_UP:
      return { ...state, ...INITIAL_STATE };
    case USER_CREATE_SIGN_UP:
      return { ...state, ...INITIAL_STATE, email: state.email };
    case USER_CREATE_FAIL_SIGN_UP:
      return {
        ...state,
        error: action.payload,
        password: "",
        confirmedPassword: "",
        loading: false
      };
    case USER_CREATE_IN_PROGRESS_SIGN_UP:
      return { ...state, loading: true };
    case CLEAN_UP:
      return {
        ...state,
        loading: false,
        password: "",
        confirmedPassword: "",
        error: ""
      };
    default:
      return state;
  }
};
