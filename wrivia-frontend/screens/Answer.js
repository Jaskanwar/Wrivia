import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";

export default function Answer() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "600",
        }}
      >
        Question
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "400",
        }}
      >
        What is the name of Canada's capital?
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Please enter your answer
      </Text>
      <Input placeholder="Enter answer" />
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
