import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, LinearProgress } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");
const Pusher = require("pusher-js");

export default function Shuffling({navigation}) {
  const {
    isHost: [isHost, setIsHost],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    playerList: [playerList, setPlayerList],
  } = React.useContext(StoreContext);
  const {
    startRound: [startRound, setStartRound],
  } = React.useContext(StoreContext);
  const {
    playerQuestion: [playerQuestion, setPlayerQuestion]
  } = React.useContext(StoreContext);
  const {
    displayQuestion: [displayQuestion, setdisplayQuestion],
  } = React.useContext(StoreContext);

  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  useEffect(() => {
    if (isHost && startRound) {
      axios
        .post(baseUrl + "api/question/question", {
          id: lobbyID,
          name: playerList[0],
        })
        .then((res) => {
          console.log(res.data)
          //setPlayerQuestion(playerQuestion.shift())
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[]);

  channel.bind("Question_" + lobbyID, function (data) {
    if (data) {
      console.log(data)
    }
  });
  
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
        }}
        source={require("../assets/shuffling.png")}
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
