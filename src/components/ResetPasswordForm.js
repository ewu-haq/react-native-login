import React, { Component } from "react";
import { View, Text, BackHandler } from "react-native";
import {
  Card,
  CardSection,
  IconInput,
  Button,
  Spinner,
  TouchableIonicons
} from "./common";
import { connect } from "react-redux";
import { cleanUpErrorMessages } from "../actions";
import { PerformResetNavigation } from "../helpers";
import { LOG_IN_SCREEN, SIGN_UP_SCREEN } from "../values/screens";

class ResetPasswordForm extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Reset Password",
    headerLeft: (
      <TouchableIonicons
        style={{ paddingLeft: 10 }}
        size={40}
        name="ios-arrow-back"
        onPress={() => {
          PerformResetNavigation(navigation, LOG_IN_SCREEN);
        }}
      />
    )
  });

  componentWillMount() {
    this.props.cleanUpErrorMessages();
  }

  render() {
    return (
      <View>
        <Text> hello </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    password: state.auth.password
  };
};

export default connect(mapStateToProps, { cleanUpErrorMessages })(
  ResetPasswordForm
);
