/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  Button,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen'

import axios from "react-native-axios"
const home=({ navigation }) =>  {
  const [data,setData]=useState([])
  const [loaded,setLoading]=useState(false)



  useEffect(()=>{


    axios.get(`https://moviesspoilers.herokuapp.com/movies`).then((newdata)=>{
      setData(newdata.data)
      setLoading(!loaded)
     
        SplashScreen.hide();
      
    

    })
  },[])

  const showdata=(content)=>
  {
    alert(content)
    console.log(data.length)

  }

  const displayitem=(({item,index})=>(
    <TouchableHighlight  key={index}  underlayColor="#ECE3E1" activeOpacity={0.1} onPress={()=>navigation.navigate('Spoiler',
    { name: item })}>
    
    <View key={index}  style={{padding:10,flexDirection:'column'}}>
    <Text   style={styles.content} >{item}</Text>
  </View>
  </TouchableHighlight>
  ))

 

  return (
    loaded?
     <View style={styles.container}>
       <View style={styles.header}>
        
       <Icon name="movie-filter" size={50}  />
       

      
       </View>
       <FlatList data={data} style={styles.scrollView} initialNumToRender={5}
       renderItem={displayitem}
       keyExtractor={(item, index) => index.toString()}

        />

       </View>:
       <ActivityIndicator color="blue" size="large"/> 
  );
};

const styles = StyleSheet.create({
 
  header:{
  flexDirection:"row",
  },
 
     
 
  scrollView: {
    backgroundColor: 'white',
    opacity:0.8
   
  },
  content:{
    textAlign:'center',
    padding:5
  }
  ,
 
  loader:{

    marginTop:10,
    alignItems:'center',
    color :'#bc2b78'
  },

 
});

export default home;
