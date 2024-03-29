import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Title({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
        }}
        source={require("../assets/wrivia_logo.png")}
      />
      <Button
        title={"Start"}
        containerStyle={{
          width: 300,
          marginBottom: 20,
        }}
        buttonStyle={{
          backgroundColor: "#FF4F63",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => navigation.navigate("Lobby")}
      />
      <Button
        title={"Instructions"}
        containerStyle={{
          width: 300,
          marginBottom: 100,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => navigation.navigate("Instructions")}
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
