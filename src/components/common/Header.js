import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.textStyle}>{this.props.headerName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 10,
    position: "relative"
  },
  textStyle: {
    fontSize: 20
  }
});

export { Header };
