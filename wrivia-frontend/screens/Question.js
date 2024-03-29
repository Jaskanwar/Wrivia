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

  const baseUrl = "https://wrivia-backend.herokuapp.com/";

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
          marginTop: 150,
        }}
      >
        Please enter your question
      </Text>
      <Input
        placeholder="Enter question"
        onChangeText={(text) => setQuestion(text)}
        disabledInputStyle={{ borderColor: "white" }}
        labelStyle={{ borderColor: "white" }}
        containerStyle={{
          paddingTop: 10,
          color: "white",
          paddingHorizontal: 25,
        }}
        inputStyle={{
          color: "white",
        }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "600",
          marginTop: 450,
        }}
      >
        Time Left: {timer}
      </Text>
      <Button
        title={"Submit"}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => enterQuestion()}
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
