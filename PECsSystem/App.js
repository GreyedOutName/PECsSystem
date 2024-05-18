import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


import Home from './screens/Home';
import Splash from './screens/Splash';
import Tutorial from './screens/Tutorial';
import EditCard from './screens/EditCard';
import AddVoice from './screens/AddVoice';
import AddCard from './screens/AddCard';


const Stack=createStackNavigator();
const Drawer=createDrawerNavigator();

const DrawerNav=()=>{
  return(
      <Drawer.Navigator 
        screenOptions={{
        drawerInactiveBackgroundColor:'#5B5F97',
        drawerActiveBackgroundColor:'#FF6B6C',
        drawerLabelStyle:{
            fontSize: 20,
            color: 'white',
            textAlign:'center',
            marginLeft: 30
        },}} 
        backBehavior='history'>
        <Drawer.Screen name="Tutorial" component={Tutorial} options={{headerShown: true,drawerItemStyle:{display:"none"}}}/>
        <Drawer.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Drawer.Screen name="EditCard" component={EditCard} options={{drawerItemStyle:{display:"none"},unmountOnBlur:true}}/>
        <Drawer.Screen name="AddCard" component={AddCard}/>
        <Drawer.Screen name="AddVoice" component={AddVoice} options={{drawerItemStyle:{display:"none"}}}/>
      </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash}/>
      <Stack.Screen name="Drawer" component={DrawerNav}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
