import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { StoreContext } from "../utils/store";
const axios = require("axios");
const Pusher = require("pusher-js");

export default function Score({ navigation }) {
  const [arr, setArr] = useState([]);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    gameData: [gameData, setGameData],
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

  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  //const baseUrl = "http://192.168.0.41:5000/";
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  let i = 0;
  useEffect(() => {
    axios
      .post(baseUrl + "api/score/score", {
        id: lobbyID,
      })
      .then((res) => {
        setGameData(res.data.scores.player);
        gameData.map((ids) => {
          ids.id = i++;
        });
        setGameData(gameData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //NED TO DO THIS SOMEHOW setPlayerQuestion(playerQuestion.shift());
  channel.bind("change_" + lobbyID + 3, function (data) {
    if (playerQuestion.length === 0) {
      navigation.navigate("Gameover");
    } else {
      navigation.navigate("Shuffling");
    }
  });
  function nextRound() {
    if (playerQuestion.length === 0) {
      axios
        .post(baseUrl + "api/lobby/changeScreen", {
          id: lobbyID,
          changeNum: 3,
        })
        .then((res) => {
          navigation.navigate("Gameover");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(baseUrl + "api/lobby/changeScreen", {
          id: lobbyID,
          changeNum: 3,
        })
        .then((res) => {
          navigation.navigate("Shuffling");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  /*
  channel.bind("change_" + lobbyID + 3, function (data) {
      navigation.navigate("Gameover");
  });

  channel.bind("newQuestion_" + lobbyID, function (data) {
    setWhoAsked(data.player[0].name);
    setdisplayQuestion(data.player[0].question);
    navigation.navigate("Answer");
  });
  

  function nextRound() {
    if (playerQuestion.length === 0) {
      axios
        .post(baseUrl + "api/lobby/changeScreen", {
          id: lobbyID,
          changeNum: 3,
        })
        .then((res) => {
          navigation.navigate("Gameover");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(baseUrl + "api/question/newQuestion", {
          id: lobbyID,
          name: playerQuestion[0],
        })
        .then((res) => {
          setWhoAsked(res.data.player.player[0].name);
          setdisplayQuestion(res.data.player.player[0].question);
          navigation.navigate("Answer");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  */

  gameData.sort((a, b) => (a.score > b.score ? 1 : b.score > a.score ? -1 : 0));
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
          marginTop: -550,
        }}
        source={require("../assets/scores.png")}
      />
      <View
        style={{
          position: "absolute",
        }}
      >
        {gameData.map((element, index) => {
          return (
            <View>
              <Text style={styles.text}>
                {index + 1 + ". " + element.name + ": " + element.score}
              </Text>
            </View>
          );
        })}
      </View>
      <Button
        title={"Next Round"}
        containerStyle={{
          width: 300,
          paddingBottom: 50,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => nextRound()}
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
  text: {
    color: "white",
    fontSize: 25,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },
});
