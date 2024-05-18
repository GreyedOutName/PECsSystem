import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import * as Progress from 'react-native-progress';
import {  StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions, TextInput, Image} from 'react-native';
import { changeAddVoiceUrl } from '../data/miscellaneous';
import { Audio } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function AddVoice({navigation}) {
  const [progress, setProgress] = useState(1.0);
  const [timer, setTimer] = useState(null);
  const [isRecording, setIsRecording] =useState(false)
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState();
  const [recordedItem, setRecordedItem] = useState([]);
  const [doneRecording,setDoneRecording]= useState(false);

  const getDurationFormatted=(millis)=>  {
    const minutes = millis / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return `${Math.floor(minutes)}:${seconds < 10 ? '0' : ''}${seconds}` 
  }

  const startRecording = async() => {
    await changeAddVoiceUrl(null);
    setRecordingDuration(0)
    setIsRecording(true);
    setIsReadyToPlay(false);
    setProgress(1.0);
    const newTimer = setInterval(() => {
        setProgress((prevProgress) => {
            if (prevProgress <= 0.0) {
              clearInterval(newTimer);
              return 1.0;
            }
            return prevProgress - 0.00238;
        });
    }, 16.67);
    setTimer(newTimer);
    try {
      // Checks if permission to use microphone is allowed
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === 'granted') {
        // Set audio mode and create recording
        await Audio.setAudioModeAsync({
          allowsRecording: true,
          playsInSilentMode: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording); // Start recording
      } else {
        setRecording(undefined);
        console.log('Permission is denied, please allow permission');
      }
    } catch (err) {
      setRecording(undefined);
      console.error('Failed to start recording:', err);
    }
  };

  // Function to handle the "Record" button press
  const stopRecording = async() => {
        clearInterval(timer);
        setTimer(null);
        setIsRecording(false);
        setIsReadyToPlay(true);
        setProgress(1); // Clear the progress
        try {
          setRecording(undefined); // Stop recording
          await recording.stopAndUnloadAsync();
          // Create new recording object with sound, duration, and file URI
          const { sound, status } = await recording.createNewLoadedSoundAsync();
          await changeAddVoiceUrl(recording.getURI())
          const newRecording = {
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
          };
          // Add new recording to recordings list and reset recording duration
          setRecordedItem(newRecording)
          setRecordingDuration(0);
          setDoneRecording(true)
        } catch (err) {
          setRecording(undefined);
          console.error('Failed to stop recording:', err);
        }
  };

  const startPlaying = async() => {
    setIsReadyToPlay(false);
    await recordedItem.sound.replayAsync()
  };

  const saveVoice=()=>{
    navigation.goBack();
    setDoneRecording(false);
    setIsReadyToPlay(false);
  }

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => {
        // Update recording duration state
        setRecordingDuration(prevDuration => {
          const newDuration = prevDuration + 1;
          // Stop recording if max length of the recording is reached, the current max length is 10
          return newDuration;
        });
      }, 1000);
    } else {
      clearInterval(timer); // Clear the timer if recording stops
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.uppertext}>
          Let's add a Voice!
        </Text>
      </View>
      
      <View style={styles.cardcontainer}>
          <Image source={require('../assets/girlwithabigassphone.png')} style={styles.image} />
      </View>
      
      <View>
        <View style={styles.btncontainer}>
        {/* Progress bar */}
        {isRecording && (
            <Progress.Bar
            progress={progress}
            height={20}
            width={windowWidth * 0.70}
            marginBottom={20}
            borderRadius={20}
            />
        )}
        {/* Record button */}
        <TouchableOpacity style={styles.addbtns} onPress={isReadyToPlay ? startPlaying : isRecording ? stopRecording : startRecording}>
        {isReadyToPlay ? (
            <Image source={require('../assets/icons8-play-60.png')} />
          ) : isRecording ? (
            <Image source={require('../assets/icons8-stop-60.png')} />
          ) : (
            <Image source={require('../assets/icons8-mic-50.png')} />
          )}
        </TouchableOpacity>
        {doneRecording?(
          <TouchableOpacity style={styles.addbtns2} onPress={()=>{saveVoice()}}>
            <Text style={styles.text}>{'Save'}</Text>
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
    marginTop: 30,
    width: '95%',
    justifyContent: 'center'
  },
  uppertext:{
    fontSize: 20,
    fontWeight: 'bold',
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
    width: windowWidth *0.90,
    paddingHorizontal: 20,
    alignItems: 'center',
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
    borderWidth: 4,
    borderColor: '#ffc145',
    marginBottom: 25,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  addbtns2:{
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
  },
  image:{
    height: windowHeight * .45,
    width: windowWidth *0.90,
  }
});