import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardList } from '../data/CardData';

export default function Splash({navigation}){
    const [skip,setskip]=useState();

    const storeData = async(value) => {
      try {
        await AsyncStorage.setItem('skipTutorial',JSON.stringify(value))
        if(skip==true){
          navigation.navigate('Drawer',{screen:'Tutorial'})
        }
        else{
          navigation.navigate('Drawer')
        }
      } catch (e) {
        alert(e);
      }
    }

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('skipTutorial');
        const truevalue = JSON.parse(value)
        if (value !== null) {
          setskip(truevalue)
        }
      } catch (e) {
        alert(e)
      }
    };

    useEffect(()=>{
      getData();
    },[])
    
    return (
        <View style={styles.container}>
          <Image source={require('../assets/FLASHCARDS + SFX/FLASHCARDS + SFX/PECS LOGO-ICON/version1.png')} style={styles.logo}/>
          <Text style={styles.t2}>
            WELCOME
          </Text>
          <TouchableOpacity onPress={()=>{storeData(true)}} style={styles.btn}>
            <Text style={styles.t3}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo:{
      alignItems: 'center',
      justifyContent: 'center',
      height: '30%',
      resizeMode: 'contain',
    },
    t2:{
      fontSize: 50,
      marginBottom:20,
      fontWeight: 'bold',
      color: '#5B5F97',
    },
    t3:{
      color: '#FFC145',
      fontWeight: 'bold',
      fontSize: 16,
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5B5F97',
      height: '7%',
      width: '55%',
      borderRadius: 50,
    }

  });
