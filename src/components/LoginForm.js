import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import FBSDK, { AccessToken, LoginManager } from "react-native-fbsdk";
import { Card, CardSection, IconInput, Button, Spinner } from "./common";
import { USER_DATA } from "../values/constants";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  loginUser,
  onFbLogin,
  onGoogleLogin,
  autoLogin,
  cleanUpErrorMessages
} from "../actions";
import firebase from "firebase";
import { PerformStackNavigation } from "../helpers";
import { SIGN_UP_SCREEN } from "../values/screens";

class LoginForm extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Log in"
  });

  componentWillMount() {
    this.props.cleanUpErrorMessages();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password, navigation } = this.props;
    this.props.loginUser({ email, password, navigation });
  }

  onSignUpText() {
    const { navigation } = this.props;
    PerformStackNavigation(this.props.navigation, SIGN_UP_SCREEN);
  }

  async onFbLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "144233756288445",
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      const { navigation } = this.props;
      this.props.onFbLogin({ token, navigation });
    }
  }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "474268404257-oidjenn5vjiam0tf0lo3jhhtop723qqb.apps.googleusercontent.com",
        iosClientId:
          "474268404257-ori3rsi50m8ho4sl3qatm8ogik6i9mko.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { navigation } = this.props;
        const { accessToken, idToken } = result;
        this.props.onGoogleLogin({ idToken, accessToken, navigation });
      } else {
        console.log("cancelled");
        return null;
      }
    } catch (e) {
      console.log("error: " + e);
      return null;
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
    loginButton = (
      <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
    );
    if (this.props.loading) {
      loginButton = <Spinner size="large" />;
    }

    return <CardSection>{loginButton}</CardSection>;
  }

  renderSocialLogin() {
    return (
      <CardSection
        style={{
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={this.onFbLogin.bind(this)}
        >
          <Image
            source={require("./facebook_login_button.png")}
            style={styles.facebookSigninButton}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 2 }}
          onPress={this.signInWithGoogleAsync.bind(this)}
        >
          <Image
            source={require("./google_login_button.png")}
            style={styles.googleSigninButton}
          />
        </TouchableOpacity>
      </CardSection>
    );
  }

  render() {
    const { email, password } = this.props;
    return (
      <Card>
        <CardSection>
          <IconInput
            iconName="user"
            placeholder="a@mail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={email}
          />
        </CardSection>

        <CardSection>
          <IconInput
            iconName="lock"
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={password}
          />
        </CardSection>

        {this.renderError()}

        {this.renderButton()}

        <CardSection>
          <Button onPress={this.onSignUpText.bind(this)}>
            No Account ? Sign up here
          </Button>
        </CardSection>

        <CardSection style={{ justifyContent: "center" }}>
          <Text style={{ alignSelf: "center" }}> --------- Or --------- </Text>
        </CardSection>

        {this.renderSocialLogin()}
      </Card>
    );
  }
}

const styles = {
  facebookSigninButton: {
    width: null,
    height: 60,
    resizeMode: "contain"
  },
  googleSigninButton: {
    width: null,
    height: 60,
    resizeMode: "contain"
  },
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
  loginUser,
  onFbLogin,
  onGoogleLogin,
  autoLogin,
  cleanUpErrorMessages
})(LoginForm);
