import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as SQLite from 'expo-sqlite';
import { EventRegister } from 'react-native-event-listeners';

const db = SQLite.openDatabase('places.db');

export default function MapScreen({ route, navigation }) {
  const [location, setLocation] = useState({ lat: route.params.lat, lng: route.params.lng });

  // Tallennetaan kartalla näkyvä paikka kantaan
  // Emittaus PlaceFinder.js:n kuuntelijalle, jotta lista päivittyy
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into place (name, lat, lng) values (?, ?, ?);', [route.params.name, location.lat, location.lng]);
    }, null,
    () => {
      EventRegister.emit('updateList');
      navigation.goBack();
    })
  }

  // Kehitysaihio: Piilota Button, kun osoite haetaan listasta
  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView style={{ flex: 1 }} initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} title={route.params.name} />
        </MapView>
      )}
      <Button title="Save Location" onPress={saveItem} />
    </View>
  );
}