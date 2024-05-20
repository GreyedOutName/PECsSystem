import { StatusBar } from 'expo-status-bar';
import { useState,useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import TutorialItems from './TutorialItems';
import TutorialSlide from '../data/TutorialSlide';

export default function Tutorial({navigation}){
    const [end,setEnd]=useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    //4:03

    const flEnd=()=>{
      setEnd(true);
    }
    return (
        <View style={styles.container}>

          <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menu}>
          <Ionicons name="menu" size={32} color="#5B5F97"/>
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.uppertext}>
              Let's get started!
            </Text>
          </View>

          <FlatList data={TutorialSlide} renderItem={({item}) => <TutorialItems item={item}/> }
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item)=>item.id}
          onEndReachedThreshold={0.5}
          onEndReached={()=>{flEnd()}}
          onScroll={Animated.event([{nativeEvent: {contentOffset:{x:scrollX}}}],{
            useNativeDriver: false
          })}
          />
          {end?(
            <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Home')}}>
              <Text style={styles.txt}>I Got It!</Text>
            </TouchableOpacity>
          ):null}
          
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
    btn:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5B5F97',
      height: '7%',
      width: '55%',
      borderRadius: 50,
      marginBottom: 50,
    },
    txt:{
      color: '#FFC145',
      fontWeight: 'bold',
      fontSize: 16,
    },
    menu: {
      justifyContent: 'center',
      alignContent: 'center',
      height: 50,
      width: 50,
      borderRadius: 30,
      position: 'absolute',
      right: 5,
      alignSelf: 'flex-start',
      marginVertical: 30,
    },
    header: {
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 100,
      width: '95%',
      justifyContent: 'center'
    },
    uppertext:{
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
