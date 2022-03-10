import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StoreContext } from "../utils/store";
const Pusher = require("pusher-js");


export default function Guessing({navigation}) {
  const {
    lobbyId: [lobbyID, setLobbyId],
  } = React.useContext(StoreContext);
  const pusher = new Pusher("62107c41ec95d815dfa2", {
    cluster: "us2",
  });
  var channel = pusher.subscribe("Wrivia");
  channel.bind("change_" +lobbyID+2, function (data) {
    if (data) {
      navigation.navigate("Score");
    }
  });
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
        }}
        source={require("../assets/guessing.png")}
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
