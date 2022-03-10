import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function Score({ navigation }) {
  const arr = [
    { id: 1, score: 3, player: "Tanreet" },
    { id: 2, score: 10, player: "Paarth" },
    { id: 3, score: 5, player: "Jason" },
  ];
  arr.sort((a, b) => (a.score > b.score ? 1 : b.score > a.score ? -1 : 0));
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
          marginTop: -550,
        }}
        source={require("../assets/scores.png")}
      />
      <View
        style={{
          position: "absolute",
        }}
      >
        {arr.map((element, index) => {
          return (
            <View>
              <Text style={styles.text}>
                {index + 1 + ". " + element.player + ": " + element.score}
              </Text>
            </View>
          );
        })}
      </View>
      <Button
        title={"Back Home"}
        containerStyle={{
          width: 300,
          paddingBottom: 50,
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
  text: {
    color: "white",
    fontSize: 25,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
  },
});
