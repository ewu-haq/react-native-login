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
import {
  emailChanged,
  cleanUpErrorMessages,
  sendResetPasswordEmail
} from "../actions";
import { PerformResetNavigation } from "../helpers";
import { LOG_IN_SCREEN, FORGOT_PASSWORD_SCREEN } from "../values/screens";

class ForgetPasswordForm extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Send reset password email",
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

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      const { navigation } = this.props;
      if (navigation.state.routeName === FORGOT_PASSWORD_SCREEN) {
        PerformResetNavigation(navigation, LOG_IN_SCREEN);
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

  onSendResetEmailCancel() {
    const { navigation } = this.props;
    PerformResetNavigation(navigation, LOG_IN_SCREEN);
  }

  onSendResetEmail() {
    const { email, navigation } = this.props;
    this.props.sendResetPasswordEmail({
      email,
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
      <Button style={{ flex: 1 }} onPress={this.onSendResetEmail.bind(this)}>
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

        {this.renderError()}

        <CardSection style={{ justifyContent: "center" }}>
          <Button
            style={{ flex: 1 }}
            onPress={this.onSendResetEmailCancel.bind(this)}
          >
            Send
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
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  cleanUpErrorMessages,
  sendResetPasswordEmail
})(ForgetPasswordForm);
