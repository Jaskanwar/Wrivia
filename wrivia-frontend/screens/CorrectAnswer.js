import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
const axios = require("axios");
const baseUrl = "https://wrivia-backend.herokuapp.com/";
import { StoreContext } from "../utils/store";
const Pusher = require("pusher-js");

export default function CorrectAnswer({ navigation }) {
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const {
    gameData: [gameData, setGameData],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    whoAskedQ: [whoAskedQ, setWhoAsked],
  } = React.useContext(StoreContext);
  //my assumption is that the above is mock data to display on the screen
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  useEffect(() => {
    axios
      .post(baseUrl + "api/score/score", {
        id: lobbyID,
        name: name,
        score: 0,
      })
      .then((res) => {
        console.log(res.data.scores.player);
        setGameData(res.data.scores.player);
        for (var ac = 0; ac < res.data.scores.player; ac++) {}
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var checks = [];

  const [check, setCheck] = useState(false);
  const refInputs = useRef([check]);
  const setInputValue = (index) => {
    console.log(index);

    const inputs = refInputs.current;
    inputs[index] = !inputs[index];
    setCheck(inputs[index]);
  };

  var arr = [];
  try {
    arr = gameData;
  } catch (e) {
    console.log(e);
  }

  arr.map((element, id) => {
    checks.push(
      <CheckBox
        center
        title={element.answer}
        checked={refInputs.current[id]}
        onPress={() => setInputValue(id)}
      />
    );
  });

  function submitCorrectAnswers() {
    arr.map((element, id) => {
      if (refInputs.current[id]) {
        element.isCorrect = true;
        console.log(id);
      }
    });
    for (let i = 0; i < arr.length; i++) {
      axios
        .post(baseUrl + "api/score/save", {
          id: lobbyID,
          name: arr[i].name,
          score: 1,
        })
        .then((res) => {
          console.log("Updated");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (name === whoAskedQ) {
      //navigation.navigate("Question");
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Select all of the correct answers. The unchecked ones will be considered
        as incorrect.
      </Text>
      {checks}
      {name === whoAskedQ && (
        <Button
          title={"Submit"}
          onPress={submitCorrectAnswers}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          buttonStyle={{
            backgroundColor: "#49B5FF",
          }}
        />
      )}
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
