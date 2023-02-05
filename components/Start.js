import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect, Component} from 'react'
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function Start({route, navigation}) {
    return(
    <View style={styles.Container}>
        <Icon name='edit' size={250}>
        </Icon>
        <TouchableOpacity>
        <Icon.Button style={styles.Button}
          name='camera'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Camera')}
        >
          Camera Mode
        </Icon.Button>
        </TouchableOpacity>
        <Icon.Button style={styles.Button}
          name='pen-tool'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Setter', {grid: new Array(81).fill(0)})}
        >
          Manual Mode
        </Icon.Button>
        <Icon.Button style={styles.Button}
          name='refresh-cw'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Load')}
        >
          Load Puzzle          
        </Icon.Button>
      </View>
    )
}

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      flexDirection: "column",
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-evenly',
    },
    Button: {
      width: '80%',
    }
  })