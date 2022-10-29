import Icon from 'react-native-vector-icons/Feather';
import React, {Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from './Start';
import CameraScreen from './CameraScreen';
import ConfirmScreen from './ConfirmScreen';
import Setter from './Setter';
import LoadScreen from './LoadScreen';
import Solver from './Solver';

const Stack = createNativeStackNavigator();

export default function HomeScreen({ route, navigation }) {
    return(
      <Stack.Navigator>
          <Stack.Screen name='Home' component={Start}/>
          <Stack.Screen name='Camera' component={CameraScreen}/>
          <Stack.Screen name='Confirm' component={ConfirmScreen}/>
          <Stack.Screen name='Setter' component={Setter}/>
          <Stack.Screen name='Load' component={LoadScreen}/>
          <Stack.Screen name='Solver' component={Solver}/>
        </Stack.Navigator>
    )
}

