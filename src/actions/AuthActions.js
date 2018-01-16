import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGGIN_IN,
  LOG_OUT
} from "../values/types";
import { USER_DATA } from "../values/constants";
import { LOG_OUT_SCREEN, LOG_IN_SCREEN } from "../values/screens";
import firebase from "firebase";
import { PerformResetNavigation } from "../helpers";
import { AsyncStorage } from "react-native";

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

export const loginUser = ({ email, password, navigation }) => {
  return dispatch => {
    loginInProgress(dispatch);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserAccess(dispatch, user, navigation))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => loginUserAccess(dispatch, user, navigation))
          .catch(() => loginUserFailed(dispatch));
      });
  };
};

const loginInProgress = dispatch => {
  dispatch({
    type: LOGGGIN_IN
  });
};

const loginUserFailed = dispatch => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserAccess = (dispatch, user, navigation) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  PerformResetNavigation(navigation, LOG_OUT_SCREEN);
};

export const logoutUser = ({ navigation }) => {
  return dispatch => {
    firebase.auth().signOut();
    dispatch({
      type: LOG_OUT
    });

    PerformResetNavigation(navigation, LOG_IN_SCREEN);
  };
};

export const onFbLogin = ({ token, navigation }) => {
  return dispatch => {
    loginInProgress(dispatch);
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        loginUserAccess(dispatch, user, navigation);
      })
      .catch(error => {
        loginUserFailed(dispatch);
      });
  };
};

export const onGoogleLogin = ({ idToken, accessToken, navigation }) => {
  return dispatch => {
    loginInProgress(dispatch);
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
        console.log("fail: " + error);
        loginUserFailed(dispatch);
      });
  };
};
