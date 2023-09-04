
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
    
    const {history} = route.params;

    return (
      <View style={styles.list}>
              <Text>Historia:</Text>
              <FlatList 
                data={history.reverse()} 
                renderItem={({ item }) => ( <Text>{item}</Text> )} 
                keyExtractor={(item, index) => index.toString()} 
                />
      </View>
    );
  }

const styles = StyleSheet.create({
list: {
    alignItems: 'center',
},
header: {
    
}
});