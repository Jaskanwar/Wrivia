import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");
const Pusher = require("pusher-js");

const Matching = ({ navigation }) => {
  const [textValue, setTextValue] = useState("");
  const [score, setScore] = useState(0);
  const refInputs = useRef([textValue]);
  const {
    gameData: [gameData, setGameData],
  } = React.useContext(StoreContext);
  const setInputValue = (index, value) => {
    const inputs = refInputs.current;
    inputs[index] = value;
    setTextValue(value);
  };
  const {
    name: [name, setname],
  } = React.useContext(StoreContext);
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  //const baseUrl = "http://192.168.0.213:3000/";

  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");

  let i = 1;
  useEffect(() => {
    axios
      .post(baseUrl + "api/score/score", {
        id: lobbyID,
      })
      .then((res) => {
        let data = res.data.scores.player;
        data.map((ids) => {
          ids.id = i++;
        });
        let notCorrect = data.filter(el => el.isCorrect === false)
        console.log(notCorrect)
        setGameData(notCorrect);
        //setGameData((res.data.scores.player));
        //setGameData(gameData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calculateScores = () => {
    let points = 0;
    for (let i = 1; i <= gameData.length; i++) {
      if (refInputs.current[i] == i.toString()) {
        points++;
      }
    }
    setScore(points);
    axios
      .post(baseUrl + "api/score/save", {
        id: lobbyID,
        name: name,
        score: score,
      })
      .then((res) => {
        pusher.disconnect();
        console.log("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(baseUrl + "api/lobby/changeScreen", {
        id: lobbyID,
        changeNum: 2,
      })
      .then((res) => {
        pusher.disconnect();
        navigation.navigate("Score");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  channel.bind("change_" + lobbyID + 2, function (data) {
    pusher.disconnect();
    if (data) {
      navigation.navigate("Score");
    }
  });

  const {
    displayQuestion: [displayQuestion, setdisplayQuestion],
  } = React.useContext(StoreContext);

  var PlayerNames = () => {
    return (
      <View>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              paddingBottom: 20,
            }}
          >
            {displayQuestion}
          </Text>
        </View>
        <View style={{ paddingBottom: 30 }}>
          {gameData.map((element) => {
            return (
              <Text
                key={element._id}
                style={{
                  color: "white",
                  fontSize: 18,
                  paddingTop: 10,
                }}
              >
                {element.id + ". " + element.answer}
              </Text>
            );
          })}
        </View>
        <View style={{ paddingBottom: 30 }}>
          {gameData.map((element) => {
            return (
              <View key={element.id + "cell"}>
                <Text
                  key={element._id}
                  style={{
                    color: "white",
                    fontSize: 20,
                    paddingTop: 15,
                  }}
                >
                  {element.name}
                </Text>
                <Input
                  key={element.id + "input"}
                  inputStyle={{
                    color: "white",
                  }}
                  disabledInputStyle={{ borderColor: "white" }}
                  labelStyle={{ borderColor: "white" }}
                  containerStyle={{
                    color: "white",
                    paddingHorizontal: -25,
                  }}
                  placeholder="Enter answer number 1, 2, 3.."
                  onChangeText={(value) => setInputValue(element.id, value)}
                  value={refInputs.current[element.id]}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          paddingBottom: 50,
        }}
      >
        Match the incorrect answers to the players who guessed them.
      </Text>
      <ScrollView>
        <PlayerNames />
      </ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          title={"Submit"}
          containerStyle={{
            width: 300,
            marginBottom: -150,
          }}
          buttonStyle={{
            backgroundColor: "#49B5FF",
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 18 }}
          onPress={() => calculateScores()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#570AB8",
    paddingHorizontal: 40,
    paddingVertical: 100,
  },
  picker: {
    marginVertical: 30,
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default Matching;
