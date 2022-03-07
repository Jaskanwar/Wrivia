import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Gameover() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 600,
          resizeMode: "contain",
        }}
        source={require("../assets/gameover.png")}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
          position: "absolute",
          paddingTop: 400,
        }}
      >
        Your score is 100 points!
      </Text>
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
