import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { StoreContext } from "../utils/store";
const axios = require("axios");

const Matching = ({ navigation }) => {
  const [textValue, setTextValue] = useState("");
  const [score, setScore] = useState(0);
  const refInputs = useRef([textValue]);
  const [data, setData] = useState([]);
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
  let i = 0;
  useEffect(() => {
    axios
      .post(baseUrl + "api/score/score", {
        id: lobbyID,
      })
      .then((res) => {
        setGameData(res.data.scores.player);
        setData(gameData)
        data.map((ids) => {
          ids.id = i++
        })
        setData(data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  const calculateScores = () => {
    let points = 0;
    for (let i = 1; i <= data.length; i++) {
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
        //navigation.navigate("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          {data.map((element) => {
            return (
              <Text
                key={element.id}
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
          {data.map((element) => {
            return (
              <View key={element.id + "cell"}>
                <Text
                  key={element.id}
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
            backgroundColor: "#FF4F63",
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
