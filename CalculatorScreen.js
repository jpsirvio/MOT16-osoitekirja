
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';


export default function CalculatorScreen({ navigation }) {

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
            <Button
            title="Historia"
            onPress={() => navigation.navigate('History', {history: history})}
            />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        padding: 5,
    },
    input: {
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
});