import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { EventRegister } from 'react-native-event-listeners';
import * as SQLite from 'expo-sqlite';
import { MAPQUEST_API_KEY } from '@env';

const db = SQLite.openDatabase('places.db');

export default function Placefinder({ navigation }) {
  const [address, setAddress] = useState('');
  const [places, setPlaces] = useState([]);

  // Tietokannan alustus
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists place (id integer primary key not null, name text, lat real, lng real);');
    });
  }, []);

  // Päivitetään tallennettujen paikkojen lista ajamalla updateList
  // kuuntelija kuuntelee MapScreen.js:n emittejä ja varmistaa, että lista päivittyy, kun uusi item lisätäään
  useEffect(() => {
    updateList();
    let listener = EventRegister.addEventListener('updateList', () => {
      updateList();
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);

  // Haetaan syötetty osoite tai paikka API:sta
  const fetchLocation = async () => {
    try {
      const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_API_KEY}&location=${address}`);
      const data = await response.json();
      const location = data.results[0].locations[0].latLng;
      const name = data.results[0].locations[0].street + ", " + data.results[0].locations[0].postalCode + " " + data.results[0].locations[0].adminArea5;
      navigation.navigate('MapScreen', { lat: location.lat, lng: location.lng, name: name });
    } catch (error) {
      console.error(error);
    }
  }

  // Päivitetään tallennettujen paikkojen lista
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from place;', [], (_, { rows }) =>
        setPlaces(rows._array)
      );
    });
  }

  // Renderöidään tallennettujen paikkojen lista
  const renderItem = ({ item }) => (
    <ListItem bottomDivider 
      onPress={() => navigation.navigate('MapScreen', item )}
      onLongPress={() => deleteItem(item.id)}
    >
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>Show on map</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  // Delete place from the database
  const deleteItem = (id) => {
    Alert.alert(
      'Do you want to remove the address?',
      'The address will be deleted permanently',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
          db.transaction(
            tx => {
              tx.executeSql(`delete from place where id = ?;`, [id]);
            }, null, updateList
          )
        }}
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={{ flex: 1, padding: "10%" }}>
      <TextInput placeholder='Type in address' onChangeText={text => setAddress(text)} value={address} />
      <Button title="Search" onPress={fetchLocation} />
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        data={places}
      />
    </View>
  );
}
