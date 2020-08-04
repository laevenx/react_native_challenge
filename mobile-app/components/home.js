import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({ navigation }) {
    const [name,setName] = useState('')
    const [difficulty, setDifficulty] = useState('')
   
        const storeData = async () => {
            try {
                console.log('asd:', name)
              await AsyncStorage.setItem('name', name)
                navigation.navigate("Game", {
                    difficulty
                })
            } catch (e) {
                console.log(e)
            }
          }

        function playDifficulty(text){
          setDifficulty(text)
          storeData()
        }
       
    

  return (
    <View style={styles.container}>
      <Text>insert your name</Text>
      <TextInput style={{ width: 100, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text) => setName(text)}></TextInput>
      <View style={styles.fixToText}>
      <Button
        title="start Easy"
        onPress={() => {
          playDifficulty('easy')
        }}
      />
      <Button
        title="start Medium"
        onPress={() => {
          playDifficulty('medium')
        }}
      />
      <Button
        title="start Hard"
        onPress={() => {
          playDifficulty('hard')
        }}
      />
      </View>
    </View>
  );
}

const styles= StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    fixToText: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  })
