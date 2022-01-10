import { StatusBar } from "expo-status-bar";
import React from "react";
import Lobby from "../screens/Lobby";
import Name from "../screens/Name";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="EnterName" component={Name} />
      <HomeStack.Screen name="Lobby" component={Lobby} />
    </HomeStack.Navigator>
  );
}
