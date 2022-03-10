import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, LinearProgress } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");
const Pusher = require("pusher-js");
import { useIsFocused, useFocusEffect } from '@react-navigation/native';

export default function Shuffling({ navigation }) {
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
    playerQuestion: [playerQuestion, setPlayerQuestion],
  } = React.useContext(StoreContext);
  const {
    displayQuestion: [displayQuestion, setdisplayQuestion],
  } = React.useContext(StoreContext);
  const {
    whoAskedQ: [whoAskedQ, setWhoAsked],
  } = React.useContext(StoreContext);
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  //const baseUrl = "https://wrivia-backend.herokuapp.com/";
  const baseUrl = "http://192.168.0.41:5000/";
  const isFocused = useIsFocused();

  useEffect(() => {
    if (startRound && isFocused) {
      axios
        .post(baseUrl + "api/question/question", {
          id: lobbyID,
          name: playerQuestion[0],
        })
        .then((res) => {
          if (res.data.next) {
            setWhoAsked(res.data.player.player[0].name);
            setdisplayQuestion(res.data.player.player[0].question);
            navigation.navigate("Answer");
          }
          playerQuestion.shift()
          setPlayerQuestion(playerQuestion);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  channel.bind("Question_" + lobbyID, function (data) {
    setWhoAsked(data.player[0].name);
    setdisplayQuestion(data.player[0].question);
    navigation.navigate("Answer");
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
