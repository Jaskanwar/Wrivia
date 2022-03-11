import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");

export default function Answer({ navigation }) {
  const {
    displayQuestion: [displayQuestion, setdisplayQuestion],
  } = React.useContext(StoreContext);
  const {
    answer: [answer, setAnswer],
  } = React.useContext(StoreContext);
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  function submitAnswer() {
    axios
      .post(baseUrl + "api/question/answer", {
        id: lobbyID,
        name: name,
        answer: answer,
      })
      .then((res) => {
        navigation.navigate("QuestionAnswered");
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
          fontSize: 40,
          fontWeight: "600",
          marginTop: 100,
        }}
      >
        Question
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "400",
          paddingTop: 10,
          paddingBottom: 60,
        }}
      >
        {displayQuestion}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
          paddingBottom: 10,
        }}
      >
        Please enter your answer
      </Text>
      <Input
        placeholder="Enter Answer"
        onChangeText={(text) => setAnswer(text)}
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
      <Button
        title={"Submit"}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          marginVertical: 10,
          paddingTop: 400,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => submitAnswer()}
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
