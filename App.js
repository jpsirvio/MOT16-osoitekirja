import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Placefinder from './PlaceFinder';
import MapScreen from './MapScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Placefinder">
        <Stack.Screen name="Placefinder" component={Placefinder} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
