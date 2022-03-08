import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Button } from "react-native-elements";
import * as Clipboard from "expo-clipboard";
import { StoreContext } from "../utils/store";
const Pusher = require("pusher-js");
const axios = require("axios");

export default function NewGame({ navigation }) {
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    playerList: [playerList, setPlayerList],
  } = React.useContext(StoreContext);
  const {
    isHost: [isHost, setIsHost],
  } = React.useContext(StoreContext);
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const {
    playerQuestion: [playerQuestion, setPlayerQuestion]
  } = React.useContext(StoreContext);

  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  let newPlayerList = [];
  channel.bind(lobbyID, function (data) {
    newPlayerList = data.lobby.player.map((x) => x.name);
    setPlayerList(newPlayerList);
    setPlayerQuestion(newPlayerList);
  });

  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  function startGame() {
    axios
      .post(baseUrl + "api/lobby/start", { id: lobbyID, start: true })
      .then((res) => {
        console.log("Game Started successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function leaveGame() {
    axios
      .post(baseUrl + "api/lobby/leave", { id: lobbyID, name: name })
      .then((res) => {
        navigation.navigate("Title")
        console.log("Game left successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  channel.bind("startGame_" + lobbyID, function (data) {
    if (data) {
      navigation.navigate("Question");
    }
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Your Game Code is
      </Text>
      <Text
        style={{
          color: "#F2EE11",
          fontSize: 40,
          fontWeight: "600",
        }}
      >
        {lobbyID}
      </Text>
      <Button
        title={"Copy code"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={() => Clipboard.setString(lobbyID)}
      />
      <Button
        title={"Leave Lobby"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={() => leaveGame()}
      />
      {isHost && (
        <Button
          title={"Start Game"}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          buttonStyle={{
            backgroundColor: "#49B5FF",
          }}
          onPress={() => startGame()}
        />
      )}
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "600",
        }}
      >
        Current Players
      </Text>
      {playerList.map((item, key) => (
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
          key={key}
        >
          {item}
        </Text>
      ))}
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
