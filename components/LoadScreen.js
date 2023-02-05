import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadScreen( {route, navigation}) {
  const [keys, setKeys] = useState([])

  async function Delete(index){
    const key=keys[index]
    await AsyncStorage.removeItem(key)
    getKeys()
  }

  async function loadPuzzle(index){
    const key = keys[index]
    const jsonValue = await AsyncStorage.getItem(key)
    const {grid} = JSON.parse(jsonValue)
    navigation.navigate('Solver', {grid})
  }

  const getKeys = async () => {
      const keysList = await AsyncStorage.getAllKeys()
      setKeys(keysList)
  }

  useEffect(() => {
    if (keys.length==0 && navigation.isFocused()){
      getKeys();
    }
  }, []);

  return (
    <View style={{flex:1, flexDirection:'column'}}>
      {keys.map((val,index) => {
            return (
              <View style={{flex:1, flexDirection:'row', maxHeight: 80}} key={index}>
              <Pressable style={{backgroundColor: 'rgba(50,50,100,0.6)', flex: 4, justifyContent:'center',alignItems:'center', borderColor: 'rgba(20,20,100,0.8)', marginTop: 5, borderWidth:5, borderRadius:25}} key={index} onPress={() => loadPuzzle(index)}>
                <Text style={{color: 'white', fontSize:30}}>{val}</Text>
              </Pressable>
              <Icon.Button style={{flex:1}}
                backgroundColor='#77AEE8'
                color='#FFFFFF'
                size={48}
                name='trash-2'
                onPress={() => Delete(index)}
                >      
              </Icon.Button>
              </View>
          )
      })}
    </View>
  )
}
