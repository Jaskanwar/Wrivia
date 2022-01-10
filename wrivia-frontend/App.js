import { StatusBar } from "expo-status-bar";
import React from "react";
import StoreProvider from "./utils/store"
import Title from "./screens/Title";
import Lobby from "./screens/Lobby";
import NewGame from "./screens/NewGame";
import JoinGame from "./screens/JoinGame";
import Loading from "./screens/Loading";
import Name from "./screens/Name";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <StoreProvider>
      <View style={styles.container}>
        <Lobby />
      </View>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
});
