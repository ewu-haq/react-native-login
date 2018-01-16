import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, CardSection, Card } from "./common/index";
import firebase from "firebase";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { USER_DATA } from "../values/constants";

class LogoutForm extends Component {
  render() {
    const { logoutUser, navigation } = this.props;
    return (
      <CardSection>
        <Button onPress={() => logoutUser({ navigation })}> Log Out </Button>
      </CardSection>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { logoutUser })(LogoutForm);
