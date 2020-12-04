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


  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import AsyncStorage from '@react-native-async-storage/async-storage';

const User = ({navigation}) => {
const [data,setData]=useState([]);
    useEffect(()=>{
        fetchCookie()
        async function fetchCookie(){
            const value = await AsyncStorage.getItem('favourite')
            setData(JSON.parse(value))
          
           }
    })

    return (
        <View >
         
           <View style={styles.header}>
        
        <Icon name="movie-filter" size={50}  />
        
        </View>

        <View style={styles.heading}>
        <Icon name="heart" size={20}  />
            <Text style={styles.head}>Favourites</Text>
        </View>
      <View style={styles.data}>
        <ScrollView style={styles.scrollview}> 
            {data.map((fav,key)=><Text  onPress={()=>navigation.navigate('Spoiler',
    { name: fav })} style={styles.text} key={key}>{fav}</Text>)}
        </ScrollView>
        </View>
        </View>
    );
};



const styles = StyleSheet.create({
 
    header:{
    flexDirection:"row",
    },
   
       data:{
         
      height:500},
   
    heading:{
       
        height:50,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        marginBottom:20


    },
    text:{
       textAlign:"center",
       marginVertical:10
    },
    head:{
        fontSize:20,
        marginLeft:10
    },

    scrollview:{backgroundColor:"white",
  opacity:0.6},
   
    loader:{
  
      marginTop:10,
      alignItems:'center',
      color :'#bc2b78'
    },
  
   
  });
  

export default User;