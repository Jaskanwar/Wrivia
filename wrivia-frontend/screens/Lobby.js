import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { StoreContext } from "../utils/store"
const axios = require('axios');

export default function Lobby({navigation}) {
  const baseUrl = "https://wrivia-backend.herokuapp.com/";
  const {lobbyId: [lobbyID, setLobbyId]} = React.useContext(StoreContext);
  const {isHost: [isHost, setIsHost]} = React.useContext(StoreContext);
  function createGame(){
    axios.post(baseUrl+'api/lobby/create').then((res)=>{
      setIsHost(true)
      setLobbyId(res.data.lobbyId)
      navigation.navigate("EnterName")
    }).catch((err)=>{
      console.log(err);
    });
  }
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        WELCOME TO WRIVIA
      </Text>
      <Button
        title={"Start New Game"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#FF4F63",
        }}
        onPress={()=> createGame()}
      />
      <Button
        title={"Join An Existing Game"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={()=> navigation.navigate("JoinGame")}
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
