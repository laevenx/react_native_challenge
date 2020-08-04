import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Finish({ route, navigation }) {
  const { data } = route.params;
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
    getData();
  }, []);

  let info;
  if (data.status === "unsolved") {
    info = (
      <View  style={{ textAlign: 'center'}}>
        <Image
        style={{width: 200, height: 200}}
          source={{
            uri: "https://images.squarespace-cdn.com/content/v1/5a7b58786f4ca3e8f5d59347/1536910649764-N3SX14VJ0G5U9I3PH5TK/ke17ZwdGBToddI8pDm48kKHtxt0YkfGwNsIUP0twYLV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UenB_TTdLuIfzUld_87_7cWACzHDMOEdXVDiAFaAie0MuWcPLFtnvN-Wy7FWDJKpPw/Better+Luck+Next+Time+5.jpg?format=1500w",
          }}
        />
        <Text>Sorry {name}, Your Board is not Solved</Text>
      </View>
    );
  } else if (data.status === "broken") {
    info = (
      <View  style={{ textAlign: 'center'}}>
        <Image 
        style={{width: 300,height: 100}}
        source={{
          uri:"https://www.nicepng.com/png/detail/123-1233526_i-dunno-emoji.png"
        }}/>
      <Text>
        {name}, Your Board is broken. make sure understand how to play sudoku
      </Text>
      </View>
    );
  } else {
    info = (
      <View  style={{ textAlign: 'center'}}>
        <Image
        style={{width: 200,height: 100}}
        source={{
          uri:'https://i.pinimg.com/564x/74/3a/5f/743a5f5dfe181f944919640126646b8c.jpg'
        }} 
        />
        <Text>Congratulation {name}</Text>
        <Text>you solved sudoku</Text>
        <Text>thanks for playing</Text>
      </View>
    );
  }
  return <View style={styles.container}>{info}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
