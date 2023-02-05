import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Svg, {Line, Circle, Rect, SvgUri } from 'react-native-svg';
import { manipulateAsync } from 'expo-image-manipulator';


export default function ConfirmGridScreen( {route, navigation}) {
    const [grid, setGrid] = useState(route.params.grid)

    return ( 
      <View style={styles.Container}>
        
      </View>
    )
}
