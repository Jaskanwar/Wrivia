import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Button } from "react-native-elements";
import * as Clipboard from "expo-clipboard";
import { StoreContext } from "../utils/store";
const Pusher = require("pusher-js");

export default function NewGame() {
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    playerList: [playerList, setPlayerList],
  } = React.useContext(StoreContext);
  const {isHost: [isHost, setIsHost]} = React.useContext(StoreContext);
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  let newPlayerList = [];
  channel.bind(lobbyID, function (data) {
    newPlayerList = data.lobby.player.map((x) => x.name);
    setPlayerList(newPlayerList);
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
        onPress={() => Clipboard.setString(lobbyID)}
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
