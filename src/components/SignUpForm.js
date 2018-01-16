import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, CardSection, IconInput, Button, Spinner } from "./common";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  confirmedPasswordChanged
} from "../actions";
import { PerformResetNavigation } from "../helpers";
import { LOG_IN_SCREEN } from "../values/screens";

class SignUpForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmedPasswordChange(text) {
    this.props.confirmedPasswordChanged(text);
  }

  render() {
    const { email, password, confirmedPassword } = this.props;
    return (
      <Card>
        <CardSection>
          <IconInput
            iconName="user"
            placeholder="a@mail.com"
            value={email}
            onChangeText={this.onEmailChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <IconInput
            iconName="lock"
            secureTextEntry
            placeholder="Enter a password"
            value={password}
            onChangeText={this.onPasswordChange.bind(this)}
          />
        </CardSection>
        <CardSection>
          <IconInput
            iconName="lock"
            secureTextEntry
            placeholder="Re-enter password"
            value={confirmedPassword}
            onChangeText={this.onConfirmedPasswordChange.bind(this)}
          />
        </CardSection>
        <CardSection style={{ justifyContent: "center" }}>
          <Button style={{ flex: 1 }}>Cancel</Button>
          <Button style={{ flex: 1 }}>Create</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    confirmedPassword: state.auth.confirmedPassword
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  confirmedPasswordChanged
})(SignUpForm);
