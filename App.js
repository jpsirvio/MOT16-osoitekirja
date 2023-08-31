import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [sum, setSum] = useState(0);
  const [diff, setDiff] = useState(0);
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

  const plusPressed = () => {
    const newSum = parseInt(first) + parseInt(second);
    setSum(newSum);
    const calc = `${first} + ${second} = ${newSum}`;
    setHistory([...history, calc]);
    setOutput('Lukujen summa on ' + newSum);
  };

  const minusPressed = () => {
    const newDiff = parseInt(first) - parseInt(second);
    setDiff(newDiff);
    const calc = `${first} - ${second} = ${newDiff}`;
    setHistory([...history, calc]);
    setOutput('Lukujen erotus on ' + newDiff);
  };

  return (
    <View style={styles.container}>
      <Text>{output}</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={setFirst}
        value={first}
        placeholder='syötä luku'
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        onChangeText={setSecond}
        value={second}
        placeholder='syötä luku'
      />
      <View style={styles.button}>
        <Button onPress={plusPressed} title='summaa' />
        <Button onPress={minusPressed} title='erota' />
      </View>
      <View style={styles.list}>
        <Text>Historia:</Text>
        <FlatList data={history} renderItem={({ item }) => ( <Text>{item}</Text> )} keyExtractor={(item, index) => index.toString()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
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
  },
  list: {
    alignItems: 'center',
  },
});
