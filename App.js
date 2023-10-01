import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAkVR_YGhrzCN_vCcXiq-zqiv00tkWdBHI",
  authDomain: "ostoslista-98989.firebaseapp.com",
  projectId: "ostoslista-98989",
  storageBucket: "ostoslista-98989.appspot.com",
  messagingSenderId: "557457953751",
  appId: "1:557457953751:web:d3ce359316aedbfbd87192"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    setItems(Object.values(data));
  
    const items = data ? Object.keys(data).map(key => ({key, ...data[key] })) : [];
    setItems(items);
    })
    }, []);

  const saveItem = () => {
    push(
      ref(database, 'items/'),
      { 'product': product, 'amount': amount });
      setProduct('');
      setAmount(''); 
  };

  const deleteItem = (key) => {
    remove(ref(database, 'items/' + key));
  };

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
        renderItem={({item}) => 
          <View style={styles.listcontainer}>
            <Text style={styles.listText}>{item.product}, {item.amount}</Text>
            <Text
              style={styles.listDelete}
              title="Bought"
              onPress={() => deleteItem(item.key)}> Bought</Text>
          </View>} 
        data={items} 
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
    fontSize: 18,
  },
  listDelete: {
    fontSize: 14,
    color: '#ff0000',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});