import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [value, setValue] = useState('');
  const [second, setSecond] = useState('');
  const [sum, setSum] = useState(0);
  const [diff, setDiff] = useState(0);
  const [output, setOutput] = useState('');
  const [list, setList] = useState([]);

  const addPressed = () => {
    setList([...list, value]);
    setValue('')
  };

  const clearPressed = () => {
    setList([]);
  };

  return (
    <View style={styles.container}>
      <Text>{output}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='add an item'
      />
      <View style={styles.button}>
        <Button onPress={addPressed} title='Add' />
        <Button onPress={clearPressed} title='Clear' />
      </View>
      <View style={styles.list}>
        <Text>Shopping List:</Text>
        <FlatList data={list} renderItem={({ item }) => ( <Text>{item}</Text> )} keyExtractor={(item, index) => index.toString()} />
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
    textDecorationStyle: 'double'
  },
});
