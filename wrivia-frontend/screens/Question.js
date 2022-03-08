import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");

export default function Question({ navigation }) {
  const [timer, settimer] = useState(30);
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const {
    question: [question, setQuestion],
  } = React.useContext(StoreContext);
  const {
    startRound: [startRound, setStartRound],
  } = React.useContext(StoreContext);

  let decrement = 30;
  useEffect(() => {
    setInterval(() => {
      settimer(decrement);
      decrement--;
    }, 1000);
    /*
    setTimeout(() => {
      setStartRound(true);
      navigation.navigate("Shuffling");
    }, 30000);
    */
  }, []);

  //const baseUrl = "https://wrivia-backend.herokuapp.com/";
  const baseUrl = "http://192.168.0.41:5000/"

  function enterQuestion() {
    axios
      .post(baseUrl + "api/question/create", {
        id: lobbyID,
        name: name,
        question: question,
      })
      .then((res) => {
        setStartRound(true);
        navigation.navigate("Shuffling");
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
        }}
      >
        Please enter your question
      </Text>
      <Input
        placeholder="Enter question"
        onChangeText={(text) => setQuestion(text)}
      />
      <Button
        title={"Submit"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={() => enterQuestion()}
      />
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Time Left: {timer}
      </Text>
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
