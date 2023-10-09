import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Button, Input, ListItem, Icon} from '@rneui/themed';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [shoppinglist, setShoppinglist] = useState([]);

  // initialize database
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, amount text, product text);');
    }, null, updateList); 
  }, []);

  // save item
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shoppinglist (amount, product) values (?, ?);', [amount, product]);    
      }, null, updateList
    )
  }

  // update list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setShoppinglist(rows._array)
      ); 
    });
  }

  // delete item
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        name="delete"
        size={25}
        color="red"
        onPress={() => deleteItem(item.id)}
      />
    </ListItem>
  );
  

  return (
    <View style={styles.container}>
      <Header
      centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
      />
      <Input
        placeholder='Product' label='PRODUCT'
        onChangeText={product => setProduct(product)} value={product} 
      />
      <Input
        placeholder='Amount' label='AMOUNT'
        onChangeText={amount => setAmount(amount)} value={amount} 
      />
      <View style={styles.button}>
        <Button
          title='Save'
          type='solid'
          color='primary'
          size='md'
          onPress={saveItem}>
          <Icon name='save' color='white' />
          Save
        </Button>
      </View>
      <FlatList
        data={shoppinglist}
        keyExtractor={item => item.id.toString()} 
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
  },
});