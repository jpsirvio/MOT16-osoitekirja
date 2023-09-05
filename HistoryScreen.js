
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
    
    const {history} = route.params;

    return (
      <View style={styles.list}>
              <FlatList 
                data={history.reverse()} 
                renderItem={({ item }) => ( <Text>{item}</Text> )} 
                keyExtractor={(item, index) => index.toString()} 
                ListHeaderComponent={<Text style={styles.header}>Historia:</Text>}
                />
      </View>
    );
  }

const styles = StyleSheet.create({
list: {
    alignItems: 'center',
    paddingTop: 10,
},
header: {
  fontWeight: 'bold',
},
});