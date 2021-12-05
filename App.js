import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
import {Audio} from 'expo-av';

export default function App() {

const [text, onChangeText] = React.useState("");

const get = async () => { 
  if (text === '') {
    return myAlert('Please enter a word.');
  }         
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
    .then((response) => response.json())
    .then((json) => {
      const result = Array.from(json[0].phonetics);
      if (Object.keys(result[0]).length === 0) {
        throw new Error();
      }
      else if (result.filter(e=>e.audio).length > 0) {
        let audioUrl = `https:${result[0].audio}`;
        playSound(audioUrl); 
      }
      else {
        throw new Error();
      }
    })
    .catch(() => {
      myAlert('Sorry.. We could not what you want.');
    });     
};

const playSound = async (audioURL) => {
  const sound = new Audio.Sound();
  await sound.loadAsync(
    { uri: audioURL},
    { shouldPlay: true}
  );
  await sound.playAsync();
};

const myAlert = (msg) =>{
  Alert.alert("Not Found", msg, [{text: "OK"}]);
};

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Type here ..'
        /> 
      <TouchableOpacity
        onPress={get}
        style={styles.button}
      >
        <Text> Play </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#000000',
    backgroundColor: '#ffffff'    
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 6
  }
});
