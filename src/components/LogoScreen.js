import React, { Component } from "react";
import { View, Text } from "react-native";
import { LOG_IN_SCREEN } from "../values/screens";
import { PerformResetNavigation } from "../helpers";

class LogoScreen extends Component {
  state = {};

  componentDidMount() {
    PerformResetNavigation(this.props.navigation, LOG_IN_SCREEN);
  }

  render() {
    return (
      <View>
        <Text> logo here </Text>
      </View>
    );
  }
}

export default LogoScreen;
