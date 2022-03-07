import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";

const CorrectAnswer = () => {
  const arr = [
    { id: 1, text: "answer1" },
    { id: 2, text: "answer2" },
    { id: 3, text: "answer3" },
  ];
  const [check0, setCheck0] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Select all of the correct answers. The unchecked ones will be considered
        as incorrect.
      </Text>
      <CheckBox
        center
        title={arr[0].text}
        checked={check0}
        onPress={() => setCheck0(!check0)}
      />
      <CheckBox
        center
        title={arr[1].text}
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />
      <CheckBox
        center
        title={arr[2].text}
        checked={check2}
        onPress={() => setCheck2(!check2)}
      />
      <Button
        title={"Submit"}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        buttonStyle={{
          backgroundColor: "#49B5FF",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#570AB8",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CorrectAnswer;
