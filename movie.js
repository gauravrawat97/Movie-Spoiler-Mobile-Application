/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';


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
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from "react-native-axios"
const movie=({navigation}) =>  {
  const [data,setData]=useState([])
  const [loaded,setLoading]=useState(true)
  const [content,setContent]=useState(null)


  const showdata=()=>
  {
   content!=''&&fetchdata()
  }

  const fetchdata=()=>{
      setLoading(false)
    axios.get(`https://moviesspoilers.herokuapp.com/movies/${content}`).then((newdata)=>{
        setData(newdata.data)
        setLoading(true)

      
      })
  }

  const displaydata=()=>{
    return(data.map((movies,key)=>
    <TouchableWithoutFeedback key={key} onPress={()=>navigation.navigate('Spoiler',{name:movies.Name})}>
      <View  style={styles.movielist}>
        <Image style={styles.movieimage} source={{uri:movies.Poster}} />
        <Text style={styles.movieitems}>{movies.Name}</Text>
        </View>
        </TouchableWithoutFeedback>))
  }

 

  return (
    
    <View>
    <Text style={styles.text} >Search your movie spoiler here</Text>

     <View style={styles.container}>
       
        <TextInput onChangeText={(data)=>setContent(data)} onEndEditing={showdata} placeholder="Input movie name"/>

     </View>
    
    {loaded?(<ScrollView style={styles.scroll} horizontal>{displaydata()}</ScrollView>):(<ActivityIndicator color="blue" size="large"/>)}

     </View>
       );
};

const styles = StyleSheet.create({
  text:{
    textAlign:"center",
    paddingVertical:20,
  },
  scroll: {
    marginHorizontal:20,
    marginTop:80
    
  },
  content:{
    textAlign:'center',
    padding:5
  }
  ,
  container:{
    padding:2,
   marginHorizontal:20,
    backgroundColor: "#fff",  
    marginBottom:40,
    borderRadius:10
  },
  loader:{

    marginTop:10,
    alignItems:'center',
    color :'#bc2b78'
  },
  
  movielist:{
      
      height:800,
      paddingHorizontal:50,
      width:200
      
  },

  movieimage:{
    height:200,
    width:150
  },
  movieitems:{
    backgroundColor:'black',
    width:150,
    padding:10,
    textAlign:"center",
    color:"white"
    

  }


 

 
});

export default movie;
