import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InfoScreen from './components/InfoScreen';
import HomeScreen from './components/HomeScreen';
import PuzzleScreen from './components/PuzzleScreen';

import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" tabBar={props => <TabBar {...props}/>} >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Puzzle" component={PuzzleScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Info" component={InfoScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}