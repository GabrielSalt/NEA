import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect, useRef, Component} from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { AutoFocus, Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

export default function CameraScreen( {route, navigation}) {
    const isFocused = useIsFocused();
    const [Permission, setPermission] = useState(Camera.useCameraPermissions())
    const [cameraRef, setCameraRef] = useState(null)
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        (async() => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setPermission(status === 'granted')
        })
    })

    async function takePhoto(){
        setEnabled(false)
        const data = await cameraRef.takePictureAsync({base64: true})
        navigation.navigate('Confirm', {image: data.uri})
    }

    function onCameraReady () {
        setEnabled(true)
    }

    if (Permission === null) {
        return(
            <Text> Camera Unavailable, Please Use Manual Setter </Text>
        )
    }
    else if (isFocused) {
        return(
                <Camera ref={ref => {setCameraRef(ref)}} type={CameraType.back} ratio='1:1' style={styles.Camera} onCameraReady={onCameraReady}>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={takePhoto} style={styles.Button} disabled={!enabled}>
                            <Icon size={36} color='#FFFFFF' name='circle'></Icon>
                        </TouchableOpacity>
                    </View>
                </Camera>
        )
    }
    else {
        return <Text>Not focused</Text>
    }
}

const styles = StyleSheet.create({
    Camera: {
        marginTop: '30%',
        width: '100%',
        aspectRatio: 1,
    },
    ButtonContainer: {
        marginTop: '90%',
        alignSelf: 'center',
    },
});