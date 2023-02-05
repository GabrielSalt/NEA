import Icon from 'react-native-vector-icons/Feather';
import React, {Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function InfoScreen() {
  const dict = [
    {
        title: 'Camera Mode',
        name: 'camera',
    },
    {
      title: 'Manual Mode',
      name: 'pen-tool',
    },
    {
        title: 'Home Screen',
        name: 'home',
    },
    {
        title: 'Save Puzzle',
        name: 'save',
    },
]
    return(
      <View style={{flexDirection:'column'}}>
        <Text>Here are the meanings of each of the symbols in the app</Text>
        <FlatList
          data={dict}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => 
            <View style={{flex: 1}}> 
              <Icon name={item['name']} size={24} color='#000000'/>
              <Text>{item['title']}</Text>
            </View>
            }
          renderSectionHeader={() => (
            <Text>Icons</Text>
          )}   
        />
      </View>
    )
}

