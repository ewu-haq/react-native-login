import React, { Component } from "react";
import { View, Platform } from "react-native";
import { AppNavigator } from "./AppNavigator";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";
import Expo from "expo";

class AppWithNavigationState extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight
        }}
      >
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
          })}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
