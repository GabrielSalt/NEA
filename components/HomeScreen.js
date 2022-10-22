import Icon from 'react-native-vector-icons/Feather';
import React, {Component} from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
    return(
      <View style={styles.Container}>
        <Icon name='edit' size={250}>
        </Icon>
        <TouchableOpacity>
        <Icon.Button style={styles.Button}
          name='camera'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Puzzle', {mode: 'Camera'})}
        >
          Camera Mode
        </Icon.Button>
        </TouchableOpacity>
        <Icon.Button style={styles.Button}
          name='pen-tool'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Puzzle', {mode: 'Setter'})}
        >
          Manual Mode
        </Icon.Button>
        <Icon.Button style={styles.Button}
          name='refresh-cw'
          backgroundColor='#77AEE8'
          size={48}
          onPress={() => navigation.navigate('Puzzle', {mode: 'Load'})}
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