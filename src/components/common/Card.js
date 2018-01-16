import React from "react";
import { View } from "react-native";

const Card = props => {
  // when we put any children under the parent, that children will show up as props.children
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1, // width of border is 1
    borderRadius: 2, // around the corner of border to radius of 2
    borderColor: "transparent",
    borderBottomWidth: 0, // remove border at bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // add shadow at bottom
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  }
};

export { Card };
