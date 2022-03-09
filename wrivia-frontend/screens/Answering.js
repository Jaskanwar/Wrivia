import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StoreContext } from "../utils/store";
const axios = require("axios");
const Pusher = require("pusher-js");

export default function Answering({navigation}) {
  const {
    startRound: [startRound, setStartRound],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  const baseUrl = "https://wrivia-backend.herokuapp.com/";

  useEffect(() => {
    if (startRound) {
      axios
        .post(baseUrl + "api/question/numAnswered", {
          id: lobbyID,
        })
        .then((res) => {
          if(res.data.scoring === true){
            navigation.navigate("chooseAnswer");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[]);
  
  channel.bind("Answered_" +lobbyID, function (data) {
    if (data.scoring === true) {
      navigation.navigate("chooseAnswer");
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
        source={require("../assets/answering.png")}
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
