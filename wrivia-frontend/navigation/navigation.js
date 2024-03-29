import { StatusBar } from "expo-status-bar";
import React from "react";
import Lobby from "../screens/Lobby";
import Name from "../screens/Name";
import NewGame from "../screens/NewGame";
import Title from "../screens/Title";
import JoinGame from "../screens/JoinGame";
import Question from "../screens/Question";
import Shuffling from "../screens/Shuffling";
import Answer from "../screens/Answer";
import CorrectAnswer from "../screens/CorrectAnswer";
import Guessing from "../screens/Guessing";
import Answering from "../screens/Answering";
import Gameover from "../screens/Gameover";
import Instructions from "../screens/Instructions";
import Matching from "../screens/Matching";
import Score from "../screens/Score"

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
      <HomeStack.Screen name="Question" component={Question} />
      <HomeStack.Screen name="Shuffling" component={Shuffling} />
      <HomeStack.Screen name="Instructions" component={Instructions} />
      <HomeStack.Screen name="Answer" component={Answer} />
      <HomeStack.Screen name="QuestionAnswered" component={Answering} />
      <HomeStack.Screen name="chooseAnswer" component={CorrectAnswer} />
      <HomeStack.Screen name="Matching" component={Matching} />
      <HomeStack.Screen name="Guessing" component={Guessing} />
      <HomeStack.Screen name="Score" component={Score} />
      <HomeStack.Screen name="Gameover" component={Gameover} />
    </HomeStack.Navigator>
  );
}
