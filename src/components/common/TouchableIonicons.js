import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TouchableIonicons = ({ style, size, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons style={style} size={size} name={name} />
    </TouchableOpacity>
  );
};

export { TouchableIonicons };
