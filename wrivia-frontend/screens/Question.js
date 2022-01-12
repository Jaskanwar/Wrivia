import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store";

export default function Question({ navigation }) {
  const [timer, settimer] = useState(30);
  let decrement = 30;
  useEffect(() => {
    setInterval(() => {
      settimer(decrement);
      decrement--;
    }, 1000);
    setTimeout(() => {
      navigation.navigate("Shuffling");
    }, 30000);
  }, []);
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
      <Input placeholder="Enter question" />
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
