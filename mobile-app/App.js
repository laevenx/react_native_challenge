import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import axios from "axios";
import Line from "./components/Line";

import Game from "./components/Game";
import Home from "./components/Home";
import Finish from "./components/Finish";

const Stack = createStackNavigator();

export default function App() {
  
  const [boards, setBoards] = useState([]);

  function checkResults() {
    const encodeBoard = (board) =>
      board.reduce(
        (result, row, i) =>
          result +
          `%5B${encodeURIComponent(row)}%5D${
            i === board.length - 1 ? "" : "%2C"
          }`,
        ""
      );

    const encodeParams = (params) =>
      Object.keys(params)
        .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
        .join("&");

    let data = encodeParams({ board });
    console.log(data);
    axios
      .post("https://sugoku.herokuapp.com/solve", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(({ data }) => {
        console.log(data.solution);
        setBoard(data.solution);
      });
  }

  function addNumber(a, b) {
    let update = board;
    console.log(`a: ${a} b: ${b}`);
    if (update[a][b] === 9) {
      update[a][b] = 0;
    } else {
      update[a][b] += 1;
    }
    console.log(update[a][b]);
    setBoard(update);
    console.log(board);
  }

  

  return (
    <NavigationContainer>
      <Stack.Navigator intialRouterName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Finish" component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 50,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function asdasdas() {
  {
    /* {board.map((row) => {
          return (
            <View style={styles.fixToText}>
              {row.map((data,key) => {
                return (
                  <Text>{data[key]}</Text>
                  <Button style={styles.button} title='+1' onPress={() => addNumber(key)}/>
                  </View>
                );
              })}
            </View>
          );
        // })}
        
      </View> */
  }
}
