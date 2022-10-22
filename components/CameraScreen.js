import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect, useRef, Component} from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { AutoFocus, Camera, CameraType } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function CameraScreen( {route, navigation}) {
    const [Permission, setPermission] = useState(Camera.useCameraPermissions())
    const [Ready, setReady] = useState(false)
    const [cameraRef, setCameraRef] = useState(null)

    useEffect(() => {
        (async() => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPermission(status === 'granted')
        })
    })

    async function takePhoto(){
        if (cameraRef){
            const data = await cameraRef.takePictureAsync({base64: true})
            setReady(false)
            navigation.navigate('Confirm', {image: data})
        }
    }

    function onCameraReady () {
        setReady(true);
    }

    if (Permission === null) {
        return(
            <Text> YOOO </Text>
        )
    }
    else {
        return(
            <View styles = {styles.Container}>
                <Camera ref={ref => {setCameraRef(ref)}} type={CameraType.back} ratio='1:1' style={styles.Camera} onCameraReady={onCameraReady}>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={takePhoto} style={styles.Button}>
                            <Icon size={36} color='#FFFFFF' name='circle'></Icon>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Camera: {
        marginTop: '30%',
        width: '100%',
        aspectRatio: 1,
    },
    Container: {
        backgroundColor: '#000000',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    ButtonContainer: {
        marginTop: '90%',
        alignSelf: 'center',
    },
});