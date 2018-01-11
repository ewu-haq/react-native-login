import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import AppWithNavigationState from './src/components/AppWithNavigationState';

class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyB4MZTd4Hok7TmtOmLBAlg97JBbQwabVWI',
      authDomain: 'react-native-manager-e2294.firebaseapp.com',
      databaseURL: 'https://react-native-manager-e2294.firebaseio.com',
      projectId: 'react-native-manager-e2294',
      storageBucket: '',
      messagingSenderId: '858222036738'
    }

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