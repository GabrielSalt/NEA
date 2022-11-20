import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component} from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Setter({route, navigation}) {
    const [text, setText] = useState(null)
    if (route.params && text==null){
      setText(route.params.grid)
    }

    return (
      <Button title={text? text: 'hi'} onPress={() => navigation.navigate('Camera')}>
      </Button>
    );
}
