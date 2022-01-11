import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store";

const axios = require("axios");

export default function Name({ navigation }) {
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const baseUrl = "https://wrivia-backend.herokuapp.com/";

  function joinLobby() {
    axios
      .post(baseUrl + "api/lobby/join", { id: lobbyID, name: name })
      .then((res) => {
        navigation.navigate("NewGame");  
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Please enter your name
      </Text>
      <Input placeholder="Enter name" onChangeText={(text) => setname(text)} />
      <Button
        title={"Join"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={() => joinLobby()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#570AB8",
    alignItems: "center",
    justifyContent: "center",
  },
});
