import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
const axios = require("axios");
//const baseUrl = "https://wrivia-backend.herokuapp.com/";
const baseUrl = "http://192.168.0.41:5000/"
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

  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  useEffect(() => {
    axios
      .post(baseUrl + "api/score/score", {
        id: lobbyID,
      })
      .then((res) => {
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
        key={id}
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
    axios.post(baseUrl + "api/lobby/changeScreen", {
      id: lobbyID
    }).then((res) =>{
      if (name === whoAskedQ) {
        navigation.navigate("Matching");
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  channel.bind("change_" +lobbyID, function (data) {
    if (data) {
      if(name === whoAskedQ){
        navigation.navigate("Matching")
      }else{
        navigation.navigate("Guessing")
      }
    }
  });

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
