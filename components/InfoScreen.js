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
    {
        title: 'Solve Puzzle',
        name: 'unlock',
    },
    {
        title: 'Undo Last Digit',
        name: 'chevron-left',
    },
    {
        title: 'Solve Next Digit',
        name: 'chevron-right',
    },
    {
        title: 'Undo Change',
        name: 'corner-down-left',
    },
    {
        title: 'Redo Change',
        name: 'corner-down-right',
    },
    {
        title: 'Remove Digit',
        name: 'trash-2',
    },
]
    return(
      <View>
        <FlatList
          data={dict}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => 
            <View> 
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

