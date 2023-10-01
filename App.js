import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

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

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Product' 
        style={styles.productInput}
        onChangeText={(product) => setProduct(product)}
        value={product}/>  
      <TextInput 
        placeholder='Amount' 
        style={styles.amountInput}
        onChangeText={(amount) => setAmount(amount)}
        value={amount}/>      
      <Button onPress={saveItem} title="Save" /> 
      <Text style={styles.listHeader}>Shopping List</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={styles.listText}>{item.product}, {item.amount}</Text>
            <Text style={styles.listDelete} onPress={() => deleteItem(item.id)}> Bought</Text>
        </View>} 
        data={shoppinglist} 
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
    productInput: {
    marginTop: 30, 
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
  },
    amountInput: {
    marginTop: 5, 
    marginBottom: 5,  
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
    listHeader: {
    marginTop: 20,
    fontSize: 30,
  },
    listText: {
    fontSize: 18
  },
  listDelete: {
    fontSize: 18,
    color: '#0000ff',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});