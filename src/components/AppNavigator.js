import { StackNavigator } from "react-navigation";
import LoginForm from "./LoginForm";
import LogoScreen from "./LogoScreen";
import { LOGO_SCREEN, LOG_IN_SCREEN } from "../values/screens";

export const AppNavigator = StackNavigator({
  LOGO_SCREEN: { screen: LogoScreen },
  LOG_IN_SCREEN: { screen: LoginForm }
});
