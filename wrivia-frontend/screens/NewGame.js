import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";

export default function NewGame() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Your Game Code is
      </Text>
      <Text
        style={{
          color: "#F2EE11",
          fontSize: 40,
          fontWeight: "600",
        }}
      >
        7685949
      </Text>
      <Button
        title={"Copy code"}
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
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        Current Players
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 15,
        }}
      >
        Sam
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
