import { StatusBar } from "expo-status-bar";
import React from "react";
import Lobby from "../screens/Lobby";
import Name from "../screens/Name";
import NewGame from "../screens/NewGame";
import Title from "../screens/Title";
import JoinGame from "../screens/JoinGame";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Title" component={Title} />
      <HomeStack.Screen name="Lobby" component={Lobby} />
      <HomeStack.Screen name="EnterName" component={Name} />
      <HomeStack.Screen name="NewGame" component={NewGame} />
      <HomeStack.Screen name="JoinGame" component={JoinGame} />
    </HomeStack.Navigator>
  );
}
