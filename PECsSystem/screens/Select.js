import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { CardList } from '../data/CardData';

const Selectables = ({item}) => (
  <TouchableOpacity style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
  </TouchableOpacity>
);

export default function Select() {

  return (
    <View style={styles.container}>
      <View style={styles.flatlistcontainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
          data={CardList}
          renderItem={Selectables}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '95%',
    justifyContent: 'center'
  },
  backbtn: {
    backgroundColor: 'lightgray',
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistcontainer:{
    marginBottom:40,
    width: '100%',
    height:'auto',
  },
  flatlistcontainer1:{
    backgroundColor: 'red',
    
  },
  item:{
    backgroundColor: 'white',
    height: 50,
    margin: 5,
    justifyContent: 'center',
    padding:10,
    borderBottomColor: '#b8b8d1',
    borderBottomWidth: 2,
    
  },
});