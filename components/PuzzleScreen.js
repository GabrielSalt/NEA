import Icon from 'react-native-vector-icons/Feather';
import React, { useState, Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraScreen from './CameraScreen';
import ConfirmScreen from './ConfirmScreen';
import Setter from './Setter';
import LoadScreen from './LoadScreen';
import Solver from './Solver';

const Stack = createNativeStackNavigator();

export default function PuzzleScreen( {route, navigation}) {
    return (
        <Stack.Navigator>
          <Stack.Screen name='Camera' component={CameraScreen}/>
          <Stack.Screen name='Confirm' component={ConfirmScreen}/>
          <Stack.Screen name='Setter' component={Setter}/>
          <Stack.Screen name='Load' component={LoadScreen}/>
          <Stack.Screen name='Solver' component={Solver}/>
        </Stack.Navigator>
    )
}
 