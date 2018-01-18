import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRMED_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGGGIN_IN,
  LOG_OUT,
  CANCEL_SIGN_UP,
  USER_CREATE_FAIL_SIGN_UP,
  USER_CREATE_IN_PROGRESS_SIGN_UP,
  USER_CREATE_SIGN_UP,
  CLEAN_UP
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

const userCreationCancel = (dispatch, navigation) => {
  dispatch({
    type: CANCEL_SIGN_UP
  });

  navigation.goBack();
};

export const signupCancel = ({ navigation }) => {
  return dispatch => {
    userCreationCancel(dispatch, navigation);
  };
};

const userCreationInProgress = dispatch => {
  dispatch({
    type: USER_CREATE_IN_PROGRESS_SIGN_UP
  });
};

const userCreationFailed = (dispatch, message) => {
  dispatch({
    type: USER_CREATE_FAIL_SIGN_UP,
    payload: message
  });
};

const userCreationSuccess = (dispatch, navigation) => {
  dispatch({
    type: USER_CREATE_SIGN_UP
  });
};

export const signupUserCreate = ({
  email,
  password,
  confirmedPassword,
  navigation
}) => {
  return dispatch => {
    userCreationInProgress(dispatch);

    if (password !== confirmedPassword) {
      userCreationFailed(dispatch, "Confirmed password does not match !!!");
    } else {
      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(userCredential => {
          userCreationSuccess(dispatch, navigation);
        })
        .catch(error => {
          userCreationFailed(dispatch, error.message);
        });
    }
  };
};

export const cleanUpErrorMessages = () => {
  return {
    type: CLEAN_UP
  };
};
