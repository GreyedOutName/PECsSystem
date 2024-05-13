import { StatusBar } from 'expo-status-bar';
import { useState ,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardList } from '../data/CardData';
import { fromAddVoiceUrl } from '../data/miscellaneous';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddCard({navigation}) {
  const [text, setText] = useState('');
  const [cantSave,setCantSave]=useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  const saveCard=async()=>{
    try {
      myDeck=CardList[0].content
      if(myDeck==null){
        newCard={
          name:text,
          audio:{uri:fromAddVoiceUrl},
        }
        myDeck=[newCard]
      }
      else{
        newCard={
          name:text,
          audio:{uri:fromAddVoiceUrl},
        }
        myDeck.unshift(newCard)
      }
      await AsyncStorage.setItem('myDeckContent',JSON.stringify(myDeck))
      setText(null)
      setCantSave(true)
    } catch (e) {
      alert(e);
    } 
  }

  const addVoice=()=>{
    setCantSave(true)
    navigation.navigate('AddVoice')
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant permission to access your media library to use this feature.',
          [{ text: 'OK' }]
        );
      } else {
        setHasGalleryPermission(true);
      }
    })();
  }, [modalVisible]);
 
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <View style={styles.btncontainerModal}>
            <TouchableOpacity style={styles.addbtns} onPress={()=>{}}>
              <Text>
                Use Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addbtns} onPress={()=>{}}>
              <Text>
                Pick From Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backbtn}>
          <Text>
            ←
          </Text>
        </TouchableOpacity>
        <Text>
          EDIT
        </Text>
      </View>
      
      <View>
        <View style={styles.cardcontainer}>
          <TouchableOpacity style={styles.addimagebtn} onPress={()=>{setModalVisible(true)}}>
            <Text>
              +
            </Text>
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
            <Text>
              ADD VOICE
            </Text>
          </TouchableOpacity>
          {cantSave?(
            <TouchableOpacity style={styles.addbtns} onPress={()=>{saveCard()}}>
            <Text>
              SAVE
            </Text>
          </TouchableOpacity>
          ):null}
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
    backgroundColor: 'lightgray',
    height: windowHeight * .45,
    width: windowWidth *0.70,
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  addimagebtn:{
    backgroundColor: 'lightblue',
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  btncontainerModal:{
    width: windowWidth *0.70,
    height: windowHeight *0.45,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'red',
  }, 
  addbtns:{
    backgroundColor: 'lightblue',
    marginBottom: 10,
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.8)',
  }
});