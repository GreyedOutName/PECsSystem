import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { CardList } from '../data/CardData';

export default function Home({navigation}) {
  const renderItem =({item})=>(
    <View style={styles.card}>
      <Text>{item.name}</Text>
      <Text>{item.category}</Text>
    </View>
  );
  const rendercategory =({item})=>(
    <TouchableOpacity style={styles.categorybtn}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
//style={styles.selectedcards}//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>DECKS || ALL</Text>
        <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menu}>
          <Text style={{alignSelf: 'center'}}>Menu</Text>
        </TouchableOpacity>
        


      <View style={{flexDirection:'row', marginTop: 50,}}> 
          <View style={styles.selectcontainer} />
          <View style={styles.selectcontainer} />
          <View style={styles.selectcontainer} />
      </View>


      <View style={{width: '90%', flexDirection: 'row', justifyContent: 'center', marginTop:15}}>
        <TouchableOpacity style={styles.trashbtn}>
          <Text>T</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playbtn}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
      </View>
      

        <View style={styles.optioncontainer}>
          <View style={styles.categorycontainer}>
              <FlatList
                bounces={false}
                horizontal={true}
                data={CardList}
                renderItem={rendercategory}
                style={styles.categoryBTNcontainer}
              />
            <TouchableOpacity style={styles.searchbtn}>
                <Text>
                  Search
                </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            bounces={false}
            horizontal={false}
            data={CardList[0].content}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
       
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',

  },
  header:{
    width: '100%',
    height: '40%',
    marginTop: '7%',
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  optioncontainer:{
    backgroundColor: 'white',
    width: '100%',
    height: '60%',
    alignItems: 'center',
    borderRadius: 16,
  },
  selectcontainer:{
    borderWidth: 1,
    width:100,
    height:125,
    margin: 5,
    borderRadius: 12,
    backgroundColor: 'white'
  },
  card:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    height:125,
    width:100,
    margin: 5,
    backgroundColor:'#fff',
    borderWidth: 1,
    borderRadius: 12,
    padding: 5,
  },
  menu: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'lightgray',
    position: 'absolute',
    right: 10,
    alignSelf: 'flex-start'
  },
  trashbtn:{
   justifyContent: 'center',
   alignItems: 'center',
   width: 60,
   height: 60,
   marginEnd: 10,
   backgroundColor: 'lightgray'
  },
  playbtn: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
  },
  categorycontainer:{
    width: '100%',
    marginTop: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  categorybtn:{
    height: 50,
    width: 50,
    marginLeft: 20,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryBTNcontainer:{
    backgroundColor: 'blue',
    width: '80%',
    left: 0,
    position: 'absolute',
    height: '100%'
  },
  searchbtn:{
    backgroundColor: 'red',
    width: '20%',
    right:0,
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center'
  }
});
