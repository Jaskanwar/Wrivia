import { StatusBar } from "expo-status-bar";
import React from "react";
import Title from "./screens/Title";
import Lobby from "./screens/Lobby";
import NewGame from "./screens/NewGame";
import JoinGame from "./screens/JoinGame";
import Loading from "./screens/Loading";
import Name from "./screens/Name";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="EnterName" component={Name} />
          <HomeStack.Screen name="Lobby" component={Lobby} />
        </HomeStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "stretch",
  },
});
