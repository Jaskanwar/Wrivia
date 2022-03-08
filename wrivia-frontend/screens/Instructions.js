import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function Instructions({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
          marginTop: -550,
        }}
        source={require("../assets/instructions.png")}
      />
      <View
        style={{
          position: "absolute",
          paddingTop: 40,
        }}
      >
        <Text style={styles.text}>
          1. Each player creates a question and answer, that does not have to be
          factually correct.
        </Text>
        <Text style={styles.text}>
          2. Each player will answer the question randomly selected by the
          program and guess who asked the question.
        </Text>
        <Text style={styles.text}>
          3. The question, question asker and all of the answers will be
          revealed.
        </Text>
        <Text style={styles.text}>
          4. As a group, players decide which answers should be correct. and the
          question asker submits this decision using the toggle.
        </Text>
        <Text style={styles.text}>
          5. The players who guess the answer or question asker correctly get a
          point.
        </Text>
        <Text style={styles.text}>
          6. The question asker tries to match player names to incorrect
          answers. This stage is skipped if no one was able to guess the
          question correctly.
        </Text>
        <Text style={styles.text}>
          7. Once all the questions have been asked the game is finished.
        </Text>
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
    fontSize: 18,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 25,
  },
});
