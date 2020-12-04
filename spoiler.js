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
  ToastAndroid,
} from 'react-native';


import axios from "react-native-axios"

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const spoiler=({ navigation,...props }) =>  {
  const [data,setData]=useState([])
  const [loaded,setLoading]=useState(false)
  const [favourite,setFavourite] = useState([])
  const [myfav,setFav] = useState(false)

 const  storeData = async (value) => {
  try {
    value=value.trim()
    const favlist=[...favourite,value]
   

    const jsonValue = JSON.stringify(favlist)
    await AsyncStorage.setItem('favourite', jsonValue)
    ToastAndroid.showWithGravity("Added to favourites",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER);
    setFav(true)


  } catch (e) {
   console.log(e);
  }
}


const  deleteData = async (value) => {
  try {
    value=value.trim()
    const favlist=favourite.filter(movie=>movie!=value)
   

    const jsonValue = JSON.stringify(favlist)
    await AsyncStorage.setItem('favourite', jsonValue)
    ToastAndroid.showWithGravity("Removed from favourites",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER);
    setFav(false)


  } catch (e) {
   console.log(e);
  }
}

  useEffect(()=>{
    fetchCookie()
    const name = props.route.params.name
    axios.get(`https://moviesspoilers.herokuapp.com/spoil/${name}`).then((newdata)=>{
      setData(newdata.data)
      setLoading(true)

     
    })
   async function fetchCookie(){
    const value = await AsyncStorage.getItem('favourite')
    console.log(JSON.parse(value))
    if(value!=null)
    {
    setFavourite(JSON.parse(value))
    const movie_name=JSON.parse(value).filter(movie=>movie==name)
    console.log(movie_name)
    movie_name.length>0?setFav(true):setFav(false)

  }

   }
  },[props.route.params.name])





if (loaded)
{
    return (
<View >
 
{data.map((d,id)=>
<View key={id} style={styles.container}>

    <Image source={{uri:d.Poster}} style={styles.poster}/>
   <Text style={styles.title}>{d.Name} 
   {myfav? <TouchableHighlight  style={styles.icon} onPress={()=>deleteData(d.Name)}><Icon name="heart" color="red" size={20}/></TouchableHighlight>
    :<TouchableHighlight style={styles.icon}  onPress={()=>storeData(d.Name)}>
    
   <Icon name="heart-outline" color="blue" size={20}/>    
   </TouchableHighlight>}
   </Text>
   
    <ScrollView style={styles.scroll}>
        <Text style={styles.spoiltext}>
            {d.Spoiler}
        </Text>
    </ScrollView>
    </View>)}

   
</View>


  )
}
else
return(
  <View>
    <ActivityIndicator color="blue" size="large"/> 

  </View>
)
}


const styles = StyleSheet.create({
    container: {
   flexDirection:'column',
   alignItems:'center',
   marginTop:20,
   
  },
 icon:{
   paddingLeft:10
 },
  scroll:{
      marginTop:20,
      padding:20,
  },
  spoiltext:{
      fontSize:20,
      fontWeight:"100",
      fontFamily: "Cochin"
  },
  poster:{
      width:200,
      height:200,
     
  },

  title:{
      marginTop:10,
      fontSize:20,
      fontWeight:"bold",
      textAlign:'center',
      padding:10


  }

 
});

export default spoiler;
// return (
//     <View>
     
//     {data.map(d=>
//     <View>
//         <Text>{d.Name}</Text>
//         <Image source={{uri:d.Poster}} style={{width:100,height:100}}/>
//         <ScrollView>
//             <Text>
//                 {d.Spoiler}
//             </Text>
//         </ScrollView>
//         </View>)}
    
       
//     </View>
    
    
//       )