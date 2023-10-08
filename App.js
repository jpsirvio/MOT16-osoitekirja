import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');

  //const getAvailableVoices = async () => {
  //  const voices = await Speech.getAvailableVoicesAsync();
  //};

  const speak = () => {
    //getAvailableVoices();
    if (text.trim() !== '') {
      const voiceOptions = {
        language: 'fi-FI', // Set the desired language and region
      };
      Speech.speak(text, voiceOptions);
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text-to-Speech App</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter text here"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <View style={styles.buttonContainer}>
        <Button title="Speak" onPress={speak} />
        <Button title="Clear Text" onPress={clearText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
});
