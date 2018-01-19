import { StackNavigator } from "react-navigation";
import LoginForm from "./LoginForm";
import LogoScreen from "./LogoScreen";
import LogoutForm from "./LogoutForm";
import SignUpForm from "./SignUpForm";
import ResetPasswordForm from "./ResetPasswordForm";
import {
  LOGO_SCREEN,
  LOG_IN_SCREEN,
  LOG_OUT_SCREEN,
  SIGN_UP_SCREEN,
  RESET_PASSWORD_SCREEN
} from "../values/screens";

export const AppNavigator = StackNavigator({
  LOGO_SCREEN: { screen: LogoScreen },
  LOG_IN_SCREEN: { screen: LoginForm },
  LOG_OUT_SCREEN: { screen: LogoutForm },
  SIGN_UP_SCREEN: { screen: SignUpForm },
  RESET_PASSWORD_SCREEN: { screen: ResetPasswordForm }
});
