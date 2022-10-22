import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component} from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Setter({route, navigation}) {
    if (route.params.mode !== 'Setter'){
      navigation.navigate(route.params.mode)
    }
    return (
      <Button title='Hi' onPress={() => navigation.navigate('Camera')}>
      </Button>
    );
}
