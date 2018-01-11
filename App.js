import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";
import AppWithNavigationState from "./src/components/AppWithNavigationState";

class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyD2v5XI6KYn6taJPbCPbH8NnCR-HkGXGwE",
      authDomain: "react-native-login-919f1.firebaseapp.com",
      databaseURL: "https://react-native-login-919f1.firebaseio.com",
      projectId: "react-native-login-919f1",
      storageBucket: "react-native-login-919f1.appspot.com",
      messagingSenderId: "1087986377304"
    };

    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
