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
  const {
    playerList: [playerList, setPlayerList],
  } = React.useContext(StoreContext);
  const {
    playerQuestion: [playerQuestion, setPlayerQuestion],
  } = React.useContext(StoreContext);
  const {
    isHost: [isHost, setIsHost],
  } = React.useContext(StoreContext);
  const baseUrl = "https://wrivia-backend.herokuapp.com/";

  function joinLobby() {
    axios
      .post(baseUrl + "api/lobby/join", {
        id: lobbyID,
        name: name,
        host: isHost,
      })
      .then((res) => {
        let newPlayerList = res.data.lobby.player.map((x) => x.name);
        setPlayerList(newPlayerList);
        setPlayerQuestion(newPlayerList);
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
          marginTop: -200,
          paddingHorizontal: 40,
          textAlign: "center",
        }}
      >
        Please enter your name
      </Text>
      <Input
        inputStyle={{
          color: "white",
        }}
        disabledInputStyle={{ borderColor: "white" }}
        labelStyle={{ borderColor: "white" }}
        containerStyle={{
          paddingTop: 100,
          color: "white",
          paddingHorizontal: 25,
        }}
        placeholder="Enter name"
        onChangeText={(text) => setname(text)}
      />
      <Button
        title={"Start"}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          position: "absolute",
          bottom: 160,
        }}
        buttonStyle={{
          backgroundColor: "#FF4F63",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => joinLobby()}
      />
      <Button
        title={"Back Home"}
        containerStyle={{
          width: 300,
          position: "absolute",
          bottom: 100,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => navigation.navigate("Title")}
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
