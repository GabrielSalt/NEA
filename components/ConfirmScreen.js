import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component} from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ConfirmScreen( {route, navigation}) {
    const picture = route.params.image
    return (
      <View style={styles.Container}>
        <Text> Confirm Image? </Text>
        <Image source={{uri: picture.uri}} style={styles.Image}></Image>
      </View>
    )
}

const styles = StyleSheet.create({
  Image: {
      marginTop: '30%',
      width: '100%',
  },
  Container: {
      backgroundColor: '#000000',
      flex: 1,
      width: '100%',
      height: '100%',
  },
  ButtonContainer: {
      marginTop: '90%',
      alignSelf: 'center',
  },
});