import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function App() {
  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [test, setTest] = useState('');
  const [diff, setDiff] = useState(0);
  const [counter, setCounter] = useState(0);
  const [output, setOutput] = useState('Arvaa numero väliltä 1-100');

  useEffect(() => {
    if (diff == 0 && counter == 0) {
      setOutput('Arvaa numero väliltä 1-100');
    } else if( diff > 0 ) {
      setOutput('Your guess is ' + test + ' too high');  
    } else if ( diff < 0 ) {
      setOutput('Your guess is ' + test + ' too low');
    } else if ( diff == 0 && counter > 0) {
      setOutput('');
      Alert.alert('You guessed the number in ' + counter + ' guesses')
      setCounter(0)
      setOutput('Arvaa numero väliltä 1-100');
      setRandom(Math.floor(Math.random() * 100) + 1)
    } 
  }, [diff]);

  const buttonPressed = () => {
    setCounter(counter+1);
    setDiff(parseInt(test) - random);
  };

  return (
    <View style={styles.container}>
      
      <Text>{output}</Text>
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={test => setTest(test)} value={test} placeholder='syötä luku' />
      <View style={styles.button}>
        <Button onPress={buttonPressed} title='Tee arvaus' />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20,
  },
  input: {
    width: 100, 
    borderColor: 'gray', 
    borderWidth: 1, 
    margin: 10,
  }
});