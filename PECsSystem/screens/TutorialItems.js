import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';

export default TutorialItems =({item})=> {
    const{width}=useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
          <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
          <View style={{flex:0.3}}>
            <Text style={styles.title}> {item.title} </Text>
            <Text style={styles.description}> {item.description} </Text>
          </View>
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
    image:{
        flex: 0.7,
        justifyContent: 'center',
    },
    title:{
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    description:{
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
  });
