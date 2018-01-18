import React, { Component } from "react";
import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import { Card, CardSection, IconInput, Button, Spinner } from "./common";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  confirmedPasswordChanged,
  signupCancel,
  signupUserCreate,
  cleanUpErrorMessages
} from "../actions";
import { PerformResetNavigation } from "../helpers";
import { LOG_IN_SCREEN, SIGN_UP_SCREEN } from "../values/screens";
import { Ionicons } from "@expo/vector-icons";

class SignUpForm extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Create new user",
    headerLeft: (
      <TouchableOpacity
        onPress={() => {
          PerformResetNavigation(navigation, LOG_IN_SCREEN);
        }}
      >
        <Ionicons style={{ paddingLeft: 10 }} size={40} name="ios-arrow-back" />
      </TouchableOpacity>
    )
  });

  componentWillMount() {
    this.props.cleanUpErrorMessages();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      const { navigation } = this.props;
      if (navigation.state.routeName === SIGN_UP_SCREEN) {
        this.props.signupCancel({ navigation });
        return true;
      } else {
        return false;
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onConfirmedPasswordChange(text) {
    this.props.confirmedPasswordChanged(text);
  }

  onSignUpCancel() {
    const { navigation } = this.props;
    this.props.signupCancel({ navigation });
  }

  onSignUpCreate() {
    const { email, password, confirmedPassword, navigation } = this.props;
    this.props.signupUserCreate({
      email,
      password,
      confirmedPassword,
      navigation
    });
  }

  renderError() {
    if (!this.props.error || 0 !== this.props.error.length) {
      return (
        <View style={styles.errorViewStyle}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    createButton = (
      <Button style={{ flex: 1 }} onPress={this.onSignUpCreate.bind(this)}>
        Create
      </Button>
    );
    if (this.props.loading) {
      createButton = <Spinner size="large" />;
    }

    return createButton;
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

        {this.renderError()}

        <CardSection style={{ justifyContent: "center" }}>
          <Button style={{ flex: 1 }} onPress={this.onSignUpCancel.bind(this)}>
            Cancel
          </Button>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorViewStyle: {
    backgroundColor: "white"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    confirmedPassword: state.auth.confirmedPassword,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  confirmedPasswordChanged,
  signupCancel,
  signupUserCreate,
  cleanUpErrorMessages
})(SignUpForm);
