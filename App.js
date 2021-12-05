import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Button, Alert, View } from 'react-native';
import {Audio} from 'expo-av';

export default function App() {

const [text, onChangeText] = React.useState("");

const get = async () => {          
  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
    .then((response) => response.json())
    .then((json) => {          
      console.log(json[0].phonetics[0].audio);
      let audioUrl = `https:${json[0].phonetics[0].audio}`;
      playSound(audioUrl);              
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
        /> 
      <Button
        title="search"
        onPress={get}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
});
