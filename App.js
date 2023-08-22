import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function App() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [sum, setSum] = useState(0);
  const [diff, setDiff] = useState(0);
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput('Lukujen summa on ' + sum);
    setFirst('');
    setSecond('');
  }, [sum]);

  useEffect(() => {
    setOutput('Lukujen erotus on ' + diff);
    setFirst('');
    setSecond('');
  }, [diff]);

  const plusPressed = () => {
    setSum(parseInt(first) + parseInt(second));
  };

  const minusPressed = () => {
    setDiff(parseInt(first) - parseInt(second));
  };


  return (
    <View style={styles.container}>
      
      <Text>{output}</Text>
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={first => setFirst(first)} value={first} placeholder='syötä luku' />
      <TextInput style={styles.input} keyboardType='numeric' onChangeText={second => setSecond(second)} value={second} placeholder='syötä luku' />
      <View style={styles.button}>
        <Button onPress={plusPressed} title='summaa' />
        <Button onPress={minusPressed} title='erota' />
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