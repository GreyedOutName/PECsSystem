import { StatusBar } from 'expo-status-bar';
import { useState ,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardList } from '../data/CardData';
import { fromAddVoiceUrl } from '../data/miscellaneous';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddCard({navigation}) {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl]=useState()

  const saveCard=async()=>{
    setAudioUrl(fromAddVoiceUrl)
    try {
      myDeck=CardList[0].content
      if(myDeck==null){
        newCard={
          name:text,
          audio:{uri:audioUrl},
        }
        myDeck=[newCard]
      }
      else{
        newCard={
          name:text,
          audio:{uri:audioUrl},
        }
        myDeck.unshift(newCard)
      }

      await AsyncStorage.setItem('myDeckContent',JSON.stringify(myDeck))

    } catch (e) {
      alert(e);
    } 
  }

  const addVoice=()=>{
    navigation.navigate('AddVoice')
  }
 
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.cardcontainer}>
          <TouchableOpacity style={styles.addimagebtn}>
            <Image source={require('../assets/icons8-plus-100.png')}/>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="INSERT TEXT"
          />
        </View>

        <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.addbtns} onPress={()=>{addVoice()}}>
          <Text style={styles.text}>
            ADD VOICE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addbtns}  onPress={()=>{saveCard()}}>
          <Text style={styles.text}>
            SAVE
          </Text>
        </TouchableOpacity>
        </View>
      </View>  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  cardcontainer:{
    backgroundColor: 'white',
    height: windowHeight * .45,
    width: windowWidth *0.70,
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#b8b8d1',
    borderStyle: 'solid',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addimagebtn:{
    backgroundColor: '#5B5F97',
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  input: {
    height: '20%',
    width: 200,
    marginTop: 25,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'grey',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  btncontainer:{
    marginTop: 30,
    width: windowWidth *0.70,
    alignItems: 'center',
  },
  addbtns:{
    backgroundColor: '#5B5F97',
    marginBottom: 16,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  text:{
    fontWeight: 'bold',
    color: '#ffc145',
    fontSize: 18,
  }
});