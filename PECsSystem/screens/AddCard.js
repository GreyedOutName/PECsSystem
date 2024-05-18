import { StatusBar } from 'expo-status-bar';
import { useState ,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput, Modal, Image} from 'react-native';
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
  const [imageUri, setImageUri]=useState(null);

  const saveCard=async()=>{
    try {
      myDeck=CardList[0].content
      if(myDeck==null){
        newCard={
          name:text,
          image:imageUri,
          audio:{uri:fromAddVoiceUrl},
        }
        myDeck=[newCard]
      }
      else{
        newCard={
          name:text,
          image:imageUri,
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

  const saveImageToDirectory = async (imageUri) => {
    try {
      const fileName = `${Date.now()}.jpg`; // File name of the image
      const directory = `${FileSystem.documentDirectory}/appName/images/`;
      // Directory path of the image
      console.log('Directory:', directory);
      // Check if the directory exists, if not, create it
      const directoryInfo = await FileSystem.getInfoAsync(directory);
      if (!directoryInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/appName/images/`, { intermediates: true });
      }
  
      // Construct the file path
      const filePath = `${directory}${fileName}`;
      await FileSystem.copyAsync({ from: imageUri, to: filePath });
      return filePath;
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  };

  // Function to pick an image from the gallery or camera
  const pickImage = async (source) => {
    try {
      // Define options for image picker
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Aspect ratio of the crop, change the aspect ratio of the image display in stylesheet
        quality: 1,
      };

      // Launch image picker based on the selected source (gallery or camera)
      const { cancelled, assets } = source === 'gallery' ?
        await ImagePicker.launchImageLibraryAsync(options) :
        await ImagePicker.launchCameraAsync(options);

      // Bless thy code below, gets the URI of the image
      if (!cancelled && assets !== null && assets.length > 0) {
        const uri = assets[0].uri;
        setImage({uri:uri});
        setImageUri({uri:uri});
        // Save the selected image to the custom directory
        const savedDirectory = await saveImageToDirectory(uri);
        if (savedDirectory) {
          console.log('Image saved to:', savedDirectory);
        }
      }
    } catch (error) {
      console.error(`Error picking image from ${source}:`, error);
    }
  };

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
            
            <TouchableOpacity style={styles.addbtns} onPress={() => pickImage('camera')}>
              <Text style={styles.text}>
                USE CAMERA
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addbtns} onPress={() => pickImage('gallery')}>
              <Text style={styles.text}>
                USE GALLERY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>
              <Text style={styles.closetext}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <View style={styles.cardcontainer}>
          <TouchableOpacity style={styles.addimagebtn} onPress={()=>{setModalVisible(true)}}>
            {image!=null?(
              <Image source={image} style={styles.cardPicture}></Image>
            ):
              (
                <Image source={require('../assets/icons8-plus-100.png')}/>
              )
            }
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
          {cantSave?(
            <TouchableOpacity style={styles.addbtns} onPress={()=>{saveCard()}}>
            <Text style={styles.text}>
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
  btncontainerModal:{
    width: windowWidth *0.70,
    height: windowHeight *0.30,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'white',
    padding: 10,
    borderRadius: 12,
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
  close:{
    backgroundColor: 'white',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d1d1'
  },
  closetext:{
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 18,
  },
  modal:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.8)',
  },
  cardPicture:{
    height:'100%',
    width:'100%',
    borderRadius: 12,
    borderWidth: 1,
  },
  text:{
    fontWeight: 'bold',
    color: '#ffc145',
    fontSize: 18,
  }
});