import React, { Component } from "react";
import { View } from "react-native";
import { Button, CardSection, Card } from "./common/index";
import firebase from "firebase";

const LogoutForm = () => {
  return (
    <CardSection>
      <Button onPress={() => firebase.auth().signOut()}> Log Out </Button>
    </CardSection>
  );
};

export default LogoutForm;
