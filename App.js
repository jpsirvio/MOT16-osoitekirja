import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        const formattedContacts = data.map(contact => ({
          id: contact.id,
          firstName: contact.firstName || 'No First Name',
          lastName: contact.lastName || 'No Last Name',
          phoneNumber: contact.phoneNumbers?.length > 0
            ? contact.phoneNumbers[0].number
            : 'No phone number',
        }));
        setContacts(formattedContacts);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Contacts</Text>
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.contactName}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          </View>
        )}
        data={contacts}
      />
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 20,
  },
  listContainer: {
    width: '100%',
  },
  listItem: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#333',
  },
});
