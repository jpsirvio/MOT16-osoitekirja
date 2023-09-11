import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
 
  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      //console.log(response.status); 
      return response.json()
    })
    .then(data => setRepositories(data.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "gray",
          marginTop: 1,
          marginBottom: 1,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <TextInput 
        style={styles.input} 
        placeholder='haettava ruoka-aine' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
       />
      <Button 
      style={styles.button}
        title="Hae reseptejä" onPress={getRepositories} 
      />
      <FlatList 
        style={styles.list}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={{width: 100, height: 100}} source={{uri: item.strMealThumb,}} />
          </View>}
        data={repositories} 
        ItemSeparatorComponent={listSeparator} /> 
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  paddingTop: 50,
  alignItems: 'center',
  justifyContent: 'center', 
 },
 input: {
  fontSize: 12,
  width: 200,
  borderColor: 'gray',
  borderWidth: 1,
  paddingLeft: 5,
 },
 button: {
 },
 list: {
  marginLeft : "5%",
 },
});