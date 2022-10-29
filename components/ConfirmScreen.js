import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';

export default function ConfirmScreen( {route, navigation}) {
    const picture = route.params.image
    return (
      <View style={styles.Container}>
        <Text> Confirm Image? </Text>
        <Image source={{uri: picture}} style={styles.Image}></Image>
        <Icon.Button
                name='check'
                color={'#44FF44'}
                backgroundColor={'#DDDDDD'}
                size={36}
                style={{borderRadius: 0, width: '100%'}}
                onPress={navigation.navigate('Setter')}
                onLongPress={navigation.navigate('Setter')}
          ></Icon.Button>
          <Icon.Button
                name='x'
                color={'#FF4444'}
                backgroundColor={'#DDDDDD'}
                size={36}
                style={{borderRadius: 0, width: '100%'}}
                onPress={navigation.navigate('Camera')}
                onLongPress={navigation.navigate('Camera')}
            ></Icon.Button>
      </View>
    )
}

const styles = StyleSheet.create({
  Image: {
      marginTop: '30%',
      width: '100%',
      aspectRatio: 1,
  },
  Container: {
      backgroundColor: '#000000',
      flex: 1,
      width: '100%',
      height: '50%',
  },
  ButtonContainer: {
      marginTop: '90%',
      alignSelf: 'center',
  },
});