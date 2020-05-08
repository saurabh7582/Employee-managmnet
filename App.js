import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants'
import Home from './screens/Homes'
import CreateEmpolyee from './screens/CreateEmpolyee'
import Profile from './screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const navigationThem={
  title:"Home Screen",
  headerTintColor:"white",
  headerStyle:{
  backgroundColor:"#00b4e0"
  }
}

 function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={navigationThem} />
        <Stack.Screen name="Create" component={CreateEmpolyee} options={{...navigationThem,title:"My Create"}}/>
        <Stack.Screen name="Profile" component={Profile} options={{...navigationThem,title:"My Profile"}}/>
    </Stack.Navigator>
    </View>
  );
}

export default ()=>{
  return(
    <NavigationContainer>
      { <App/>}
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //alignItems: 'center',
    //justifyContent: 'center'
  },
});
