import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGGIN_IN,
  LOG_OUT
} from "../values/types";
import { LOG_OUT_SCREEN, LOG_IN_SCREEN } from "../values/screens";
import firebase from "firebase";
import { PerformResetNavigation } from "../helpers";

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
  const credential = firebase.auth.FacebookAuthProvider.credential(token);
  return dispatch => {
    loginInProgress(dispatch);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });

        PerformResetNavigation(navigation, LOG_OUT_SCREEN);
      })
      .catch(error => {
        dispatch({
          type: LOGIN_USER_FAIL
        });
      });
  };
};

export const onGoogleLogin = ({ idToken, accessKey, navigation }) => {
  const credential = firebase.auth.GoogleAuthProvider.credential(
    idToken,
    accessKey
  );
  console.log("credential: ");
  console.log(credential);
  return dispatch => {
    loginInProgress(dispatch);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(user => {
        console.log("success: ");
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: user
        });

        PerformResetNavigation(navigation, LOG_OUT_SCREEN);
      })
      .catch(error => {
        console.log("fail: " + error);
        dispatch({
          type: LOGIN_USER_FAIL
        });
      });
  };
};
