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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigation from "./navigation/navigation";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const HomeStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
        <View style={styles.container}>
          <Navigation />
        </View>
      </StoreProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
});
