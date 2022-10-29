import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react'
import { StyleSheet, Text, View, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InfoScreen from './components/InfoScreen';
import HomeScreen from './components/HomeScreen';

import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Main" tabBar={props => <TabBar {...props}/>} >
        <Tab.Screen name="Main" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Info" component={InfoScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}