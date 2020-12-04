/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';

import 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import home from "./home"
import movie from "./movie"
import spoiler from "./spoiler"
import Users from "./user"

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const App=() =>  {

  return (

<NavigationContainer>

<Stack.Navigator initialRouteName="Home">
  
  <Stack.Screen name="Home" component={DrawerNavigation} headerShown={false}
      options={{headerMode: 'none', headerShown: false}} />
  <Stack.Screen name="Spoiler" headerShown={false}
      options={{headerMode: 'none', headerShown: true}} component={spoiler}/>
  </Stack.Navigator>

 </NavigationContainer>


  

    
);
  }


const DrawerNavigation = ()=>
(
  <Tab.Navigator initialRouteName="Home" 



tabBarOptions={{
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
}}


screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
  
    if (route.name === 'Home') {
      iconName = 'home';
    } else if (route.name === 'Movie Search') {
      iconName = 'search';
    }

    else if (route.name === 'Users') {
      iconName = 'user';
    }

    // You can return any component that you like here!
    return <Icon name={iconName} size={size} color={color} />;
  },
})}
>


      <Tab.Screen name="Home" component={home} />
      <Tab.Screen name="Movie Search" component={movie} />
      <Tab.Screen name="Users" component={Users} />

      </Tab.Navigator>
   
   
)
export default App;
