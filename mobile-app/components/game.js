import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Constants from "expo-constants";
import axios from "axios";

export default function Game({route, navigation }) {
  const {difficulty} = route.params
  const [board, setBoard] = useState([]);
  const [name, setName] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("name");
      if (value !== null) {
        setName(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    axios.get(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(({ data }) => {
      console.log(data);
      setBoard(data.board);
      getData();
    })
    .catch(console.log)
  }, []);

  function autoSolving() {
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

  function checkResults1() {
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
      .post("https://sugoku.herokuapp.com/validate", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(({ data }) => {
        console.log(data);
        navigation.navigate("Finish", {
          data,
        });
      })
      .catch(console.log);
  }

  function changeNumber(num, a, b) {
    let numreg = /^[0-9]+$/;
    if (numreg.test(num)) {
      let update = board;
      update[a][b] = Number(num);
      setBoard(update);
      console.log(board);
    }
  }

  let boardtest = [];
  let row = [];
  boardtest = board.map((row, indexrow) => {
    return <View style={styles.fixToText}>
        {row.map((data, indexdata) => {
          return <View style={styles.Square} key={indexdata}>
              <TextInput
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  borderColor: "gray",
                  borderWidth: 1,
                }}
                onChangeText={(text) => changeNumber(text, indexrow, indexdata)}
                maxLength={1}
                defaultValue={JSON.stringify(data)}
              />
            </View>
          
        })}
      </View>
    
  });

 
  return (
    <View style={styles.container}>
      <Text>hello {name}</Text>

      <View>{boardtest}</View>
      <TouchableHighlight style={styles.button} onPress={() => checkResults1()} >
        <Text style={{textAlign: 'center',}}>Validate</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} onPress={() => autoSolving()} >
        <Text style={{textAlign: 'center',}}>
          Auto-Solving
        </Text>
      </TouchableHighlight>
    </View>
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
    width: 150,
    padding: 10,
    backgroundColor: "#61e2ff",
    borderColor: "gray",
    borderWidth: 1,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Square: {
 
    width: 30,
    height: 30,
    backgroundColor: '#d1d1d1'
 
  }
});
