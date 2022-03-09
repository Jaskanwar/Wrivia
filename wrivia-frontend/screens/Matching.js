import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { StoreContext } from "../utils/store";

const Matching = () => {
  var score = 0;
  const {
    displayQuestion: [displayQuestion, setdisplayQuestion],
  } = React.useContext(StoreContext);
  const data = [
    { id: 1, name: "Tanreet", answer: "Hockey" },
    { id: 2, name: "Paarth", answer: "Tennis" },
    { id: 3, name: "Jason", answer: "Soccer" },
    { id: 4, name: "Jas", answer: "Hockey" },
    { id: 5, name: "Charlie", answer: "Tennis" },
  ];

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
