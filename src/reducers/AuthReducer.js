import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRMED_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGGIN_IN,
  LOG_OUT
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
    default:
      return state;
  }
};
