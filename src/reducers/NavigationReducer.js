import { LOGO_SCREEN } from "../values/screens";
import { AppNavigator } from "../components/AppNavigator";

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams(LOGO_SCREEN)
);

export default (NavigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
});
