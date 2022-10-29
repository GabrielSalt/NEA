import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, {Component} from 'react'
import Icon from 'react-native-vector-icons/Feather';

export default function MyTabBar({ state, descriptors, navigation }) {
  const dict = {
    'Main': 'home',
    'Info': 'info'
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={Math.random()*100000000}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, 
                    alignItems: 'center', 
                    borderTopColor: '#999999', 
                    borderTopWidth: 1, 
                    backgroundColor:'#DDDDDD', 
                    borderRadius: 0 }}
          >
            <Icon.Button
            key={Math.random()*100000000}
                name={dict[label]}
                color={isFocused ? '#673ab7' : '#222' }
                backgroundColor={'#DDDDDD'}
                size={36}
                style={{borderRadius: 0, width: '100%'}}
                onPress={onPress}
                onLongPress={onLongPress}
            >
            </Icon.Button>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}