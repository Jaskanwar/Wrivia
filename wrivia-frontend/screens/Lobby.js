import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");

export default function Lobby({ navigation }) {
  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    isHost: [isHost, setIsHost],
  } = React.useContext(StoreContext);
  function createGame() {
    axios
      .post(baseUrl + "api/lobby/create")
      .then((res) => {
        setIsHost(true);
        setLobbyId(res.data.lobbyId);
        navigation.navigate("EnterName");
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
          fontSize: 40,
          fontWeight: "bold",
          marginHorizontal: 40,
          marginTop: -100,
          textAlign: "center",
        }}
      >
        WELCOME TO WRIVIA
      </Text>
      <Button
        title={"Start New Game"}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          paddingTop: 60,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#FF4F63",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => createGame()}
      />
      <Button
        title={"Join An Existing Game"}
        containerStyle={{
          width: 300,
          paddingTop: 20,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => navigation.navigate("JoinGame")}
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
