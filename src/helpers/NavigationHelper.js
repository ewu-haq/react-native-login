import { NavigationActions } from "react-navigation";

export const PerformResetNavigation = (navigation, screen_name) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: screen_name })]
  });
  navigation.dispatch(resetAction);
};

export const PerformStackNavigation = (
  navigation,
  screen_name,
  extraParams = {}
) => {
  const navigateAction = NavigationActions.navigate({
    routeName: screen_name,
    params: extraParams,
    action: NavigationActions.navigate({ routeName: screen_name })
  });
  navigation.dispatch(navigateAction);
};
