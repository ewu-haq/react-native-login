import React, { Component } from "react";
import { View } from "react-native";

const CardSection = props => {
  const newStyle = { ...styles.containerStyle, ...props.style };
  return (
    // style can take an array

    <View style={newStyle}>{props.children}</View>
  );
};

const styles = {
  containerStyle: {
    borderColor: "transparent",
    padding: 5,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    flexDirection: "row",
    position: "relative"
  }
};

export { CardSection };
