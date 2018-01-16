import React, { Component } from "react";
import { View, Text } from "react-native";
import { LOG_IN_SCREEN } from "../values/screens";
import { PerformResetNavigation } from "../helpers";
import firebase from "firebase";
import { connect } from "react-redux";
import { autoLogin } from "../actions";

class LogoScreen extends Component {
  state = {};

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!this.props.currentUser) {
          const { navigation } = this.props;
          this.props.autoLogin({ user, navigation });
        }
      } else {
        PerformResetNavigation(this.props.navigation, LOG_IN_SCREEN);
      }
    });
  }

  render() {
    return (
      <View>
        <Text> logo here </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user
  };
};

export default connect(mapStateToProps, { autoLogin })(LogoScreen);
