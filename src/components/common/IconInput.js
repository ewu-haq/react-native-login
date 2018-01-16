import React, { Component } from "react";
import { View, TextInput, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const IconInput = ({
  iconName,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { textInputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <EvilIcons name={iconName} size={40} style={labelStyle} color="#007aff" />
      <TextInput
        underlineColorAndroid="transparent"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={textInputStyle}
      />
    </View>
  );
};

const styles = {
  textInputStyle: {
    width: 100,
    height: 25,
    color: "#000",
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 23,
    flex: 5
  },
  labelStyle: {
    paddingLeft: 10,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
};

export { IconInput };
