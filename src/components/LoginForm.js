import React, { Component } from "react";
import { View, Text } from "react-native";
import FBSDK, { AccessToken, LoginManager } from "react-native-fbsdk";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import firebase from "firebase";

class LoginForm extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Log in"
  });

  onEmailChange(text) {
    this.props.emailChanged("a@m.com"); // For testing only
  }

  onPasswordChange(text) {
    this.props.passwordChanged("123456"); // for testing only
  }

  onButtonPress() {
    const { email, password, navigation } = this.props;
    this.props.loginUser({ email, password, navigation });
  }

  async onFbLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "144233756288445",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      console.log("Logged in!", `Hi ${(await response.json()).name}!`);
      AccessToken.getCurrentAccessToken().then(AccessTokenData => {
        const token = AccessTokenData.accessToken;
        const provider = firebase.auth.FacebookAuthProvider();
        const credential = provider.credential(token);
        firebase.auth().signInWithCredential(credential);
        console.log("register ssucessfully");
      });
    }
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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="a@mail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>{this.renderButton()}</CardSection>
        <CardSection>
          <Button onPress={this.onFbLogin.bind(this)}>
            Login with Facebook
          </Button>
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
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm);
