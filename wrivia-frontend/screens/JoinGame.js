import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input } from "react-native-elements";
import { StoreContext } from "../utils/store"

export default function JoinGame({navigation}) {
  const {lobbyId: [lobbyID, setLobbyId]} = React.useContext(StoreContext);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "600",
        }}
      >
        Enter the code to join
      </Text>
      <Input placeholder="Enter code" onChangeText={text => setLobbyId(text)}/>
      <Button
        title={"Start"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
        onPress={()=> lobbyID? navigation.navigate("EnterName"): ""}
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
