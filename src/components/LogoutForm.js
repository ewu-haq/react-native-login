import React, { Component } from "react";
import { View } from "react-native";
import { Button, CardSection, Card } from "./common/index";
import firebase from "firebase";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

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

export default connect(null, { logoutUser })(LogoutForm);
