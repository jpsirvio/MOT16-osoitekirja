import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MAPQUEST_API_KEY } from '@env';

export default function App() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const mapRef = useRef(null);

  const fetchLocation = async () => {
    try {
      const response = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_API_KEY}&location=${address}`
      );
      if (!response.ok) {
        console.error('API error');
        return;
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].locations[0].latLng;
        const newRegion = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        };
        setMapRegion(newRegion);
        setLocation({ latitude: lat, longitude: lng });
        mapRef.current?.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const newRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    };
    setMapRegion(newRegion);
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

    // Use useEffect to run getLocationAsync when the component mounts
    useEffect(() => {
      getLocationAsync();
    }, []); // The empty dependency array means it will only run once on mount  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Syötä osoite"
        onChangeText={(text) => setAddress(text)}
      />
      <Button title="Hae sijainti" onPress={fetchLocation} />
      {location && (
        <MapView
          style={{ width: 300, height: 300, marginTop: 20 }}
          initialRegion={mapRegion}
          ref={mapRef}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Marker"
          />
        </MapView>
      )}
    </View>
  );
}
