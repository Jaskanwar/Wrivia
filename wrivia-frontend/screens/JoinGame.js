import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store";

export default function JoinGame({ navigation }) {
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
          marginTop: -200,
          paddingHorizontal: 40,
          textAlign: "center",
        }}
      >
        Please enter the game code to join an existing lobby
      </Text>
      <Input
        inputStyle={{
          color: "white",
        }}
        disabledInputStyle={{ borderColor: "white" }}
        labelStyle={{ borderColor: "white" }}
        containerStyle={{
          paddingTop: 100,
          color: "white",
          paddingHorizontal: 25,
        }}
        placeholder="Enter code"
        onChangeText={(text) => setLobbyId(text)}
      />
      <Button
        title={"Next"}
        containerStyle={{
          width: 300,
          marginHorizontal: 50,
          position: "absolute",
          bottom: 160,
        }}
        buttonStyle={{
          backgroundColor: "#FF4F63",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => (lobbyID ? navigation.navigate("EnterName") : "")}
      />
      <Button
        title={"Back Home"}
        containerStyle={{
          width: 300,
          position: "absolute",
          bottom: 100,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        titleStyle={{ fontWeight: "bold", fontSize: 18 }}
        onPress={() => navigation.navigate("Title")}
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
