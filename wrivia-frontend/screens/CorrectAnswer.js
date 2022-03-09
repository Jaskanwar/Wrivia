import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button, Input, CheckBox } from "react-native-elements";
const axios = require("axios");
const baseUrl = "https://wrivia-backend.herokuapp.com/";
import { StoreContext } from "../utils/store";

export default function CorrectAnswer({ navigation }) {
  // const arr = [
  //   { id: 1, text: "answer1" },
  //   { id: 2, text: "answer2" },
  //   { id: 3, text: "answer3" },
  // ];
    const {
      name: [name, setname],
    } = React.useContext(StoreContext);
    const {
      gameData: [gameData, setGameData],
    } = React.useContext(StoreContext);
    const {
      lobbyId: [lobbyID, setLobbyId],
    } = React.useContext(StoreContext);
    //my assumption is that the above is mock data to display on the screen
var hooks =[]
var hooksB = []

    useEffect(() => {
      axios
        .post(baseUrl + "api/score/score", {
          id: lobbyID,
          name: name,
          score: 0,
        })
        .then((res) => {
          console.log(res.data.scores.player)
          setGameData(res.data.scores.player);
          for(var ac =0;ac<res.data.scores.player;ac++){


          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    var checks = [];
    var allArr;
    // axios
    //   .post(baseUrl + "api/score/score", {
    //     id: lobbyID,
    //     name: name,
    //     score: 0
    //  })
    //   .then((res) => {
    //     allArr =res;

    //     setGameData(allArr.data.scores.player)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // var currArr;
    // for(var c = 0;c<allArr[])
      console.log(gameData);
      console.log("asfd");
      const {visibilities, setVisibilities}  = React.useState(() => gameData.map((x) => true));


      const [check, setCheck] = useState(false);
    const refInputs = useRef([check]);
    const setInputValue = (index) => {
      console.log(index);

      const inputs = refInputs.current;
      inputs[index] = !inputs[index];
      setCheck(inputs[index])
      };


      var arr = [];
      try {
        arr = gameData;
      } catch (e) {
        console.log(e);
      }
      console.log("asfd");
      // for(var c = 0;c<allArr.data.scores.player.length;c++){
      //   arr.push(allArr.scores.player[c].answer);
      // }
      
      // for (var i = 0; i < arr.length; i++) {
      //   console.log(i+"start")
      arr.map((element, id)=>{
        var checkHolder = Object();
        
       console.log(refInputs.current[id])

        checks.push(
          <CheckBox
            center
            title={element.answer}
            checked={refInputs.current[id]}
            onPress={() => setInputValue(id)}
    />
        );
      
    })
      console.log("passed")
      
  
    
  
  function submitCorrectAnswers() {
    arr.map((element,id)=>{
      if(refInputs.current[id]){
        //mark as correct
        element.isCorrect = true;
        console.log(id);
        
      }
    })
    
    //push to backend

  }

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
      {checks}
      {/* <CheckBox
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
      /> */}
      {/* <CheckBox
        center
        title={arr[0].text}
        checked={check0}
        onPress={() => setCheck0(!check0)}
      /> */}

      <Button
        title={"Submit"}
        onPress={submitCorrectAnswers}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#570AB8",
    alignItems: "center",
    justifyContent: "center",
  },
});
