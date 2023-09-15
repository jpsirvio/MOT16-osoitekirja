import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { API_URL, API_TOKEN } from '@env';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [inputAmount, setInputAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("apikey", API_TOKEN);

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  useEffect(() => {
    fetch(API_URL, requestOptions)
      .then(response => response.json())
      .then(result => setData(Object.entries(result.rates)))
      .catch(error => console.log('error', error));
  }, []);

  const handleConversion = () => {
    if (selectedCurrency && inputAmount !== '') {
      const selectedRate = data.find(item => item[0] === selectedCurrency)[1];
      const converted = (parseFloat(inputAmount) / selectedRate).toFixed(2);
      setConvertedAmount(converted);
    } else {
      setConvertedAmount(null);
    }
  };

  const imageUrl = 'https://publicdomainvectors.org/photos/coins_1.png';

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {convertedAmount !== null && (
        <View style={styles.convertedAmount}>
          <Text>{convertedAmount} EUR</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Syötä rahamäärä"
          keyboardType="numeric"
          value={inputAmount}
          onChangeText={(text) => {
            setInputAmount(text);
            setConvertedAmount(null);
          }}
          onBlur={handleConversion}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => {
            setSelectedCurrency(itemValue);
            setConvertedAmount(null);
          }}
        >
          <Picker.Item label="Valitse valuutta" value={null} />
          {data.map(item => (
            <Picker.Item key={item[0]} label={item[0]} value={item[0]} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  image: {
    width: '100%',
    height: 100,
  },
  convertedAmount: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  picker: {
    flex: 1,
  },
});
