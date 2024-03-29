import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Gameover({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Title");
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={{
          flex: 1,
          width: 500,
          resizeMode: "contain",
          paddingHorizontal: 20,
        }}
        source={require("../assets/gameover.png")}
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
