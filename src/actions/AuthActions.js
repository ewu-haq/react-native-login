import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRMED_PASSWORD_CHANGED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_IN_PROGRESS,
  USER_LOG_OUT,
  USER_SIGN_UP_CANCEL,
  USER_SIGN_UP_FAILED,
  USER_SIGN_UP_IN_PROGRESS,
  USER_SIGN_UP_SUCCESS,
  USER_AUTH_PAGE_CLEAN_UP,
  USER_SEND_RESET_PASSWORD_EMAIL_IN_PROGRESS,
  USER_SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  USER_SEND_RESET_PASSWORD_EMAIL_FAILED
} from "../values/types";
import { USER_DATA } from "../values/constants";
import { LOG_OUT_SCREEN, LOG_IN_SCREEN } from "../values/screens";
import firebase from "firebase";
import { PerformResetNavigation } from "../helpers";
import { AsyncStorage, Linking } from "react-native";

const AuthInProgress = (dispatch, type) => {
  dispatch({ type: type });
};

const AuthFailed = (dispatch, type, message) => {
  dispatch({
    type: type,
    payload: message
  });
};

const loginUserAccess = (dispatch, user, navigation) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user
  });

  PerformResetNavigation(navigation, LOG_OUT_SCREEN);
};

const AuthSuccessNoUser = (dispatch, type, navigation) => {
  dispatch({
    type: type
  });

  PerformResetNavigation(navigation, LOG_IN_SCREEN);
};

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmedPasswordChanged = text => {
  return {
    type: CONFIRMED_PASSWORD_CHANGED,
    payload: text
  };
};

export const autoLogin = ({ user, navigation }) => {
  return dispatch => {
    loginUserAccess(dispatch, user, navigation);
  };
};

export const loginUser = ({ email, password, navigation }) => {
  return dispatch => {
    AuthInProgress(dispatch, USER_LOGIN_IN_PROGRESS);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserAccess(dispatch, user, navigation))
      .catch(error => {
        AuthFailed(dispatch, USER_LOGIN_FAIL, error.message);
      });
  };
};

export const logoutUser = ({ navigation }) => {
  return dispatch => {
    firebase.auth().signOut();
    dispatch({
      type: USER_LOG_OUT
    });
  };
};

export const onFbLogin = ({ token, navigation }) => {
  return dispatch => {
    AuthInProgress(dispatch, USER_LOGIN_IN_PROGRESS);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        loginUserAccess(dispatch, user, navigation);
      })
      .catch(error => {
        AuthFailed(dispatch, USER_LOGIN_FAIL, error.message);
      });
  };
};

export const onGoogleLogin = ({ idToken, accessToken, navigation }) => {
  return dispatch => {
    AuthInProgress(dispatch, USER_LOGIN_IN_PROGRESS);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        loginUserAccess(dispatch, user, navigation);
      })
      .catch(error => {
        AuthFailed(dispatch, USER_LOGIN_FAIL, error.message);
      });
  };
};

export const signupUserCreate = ({
  email,
  password,
  confirmedPassword,
  navigation
}) => {
  return dispatch => {
    AuthInProgress(dispatch, USER_SIGN_UP_IN_PROGRESS);

    if (password !== confirmedPassword) {
      AuthFailed(
        dispatch,
        USER_SIGN_UP_FAILED,
        "Confirmed password does not match !!!"
      );
    } else {
      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(userCredential => {
          AuthSuccessNoUser(dispatch, USER_SIGN_UP_SUCCESS, navigation);
        })
        .catch(error => {
          AuthFailed(dispatch, USER_SIGN_UP_FAILED, error.message);
        });
    }
  };
};

export const sendResetPasswordEmail = ({ email, navigation }) => {
  return dispatch => {
    AuthInProgress(dispatch, USER_SEND_RESET_PASSWORD_EMAIL_IN_PROGRESS);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        AuthSuccessNoUser(
          dispatch,
          USER_SEND_RESET_PASSWORD_EMAIL_SUCCESS,
          navigation
        );
      })
      .catch(error => {
        AuthFailed(
          dispatch,
          USER_SEND_RESET_PASSWORD_EMAIL_FAILED,
          error.message
        );
      });
  };
};

export const cleanUpErrorMessages = () => {
  return {
    type: USER_AUTH_PAGE_CLEAN_UP
  };
};
