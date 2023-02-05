import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

export default function CameraScreen( { route, navigation } ) {
  const isFocused = useIsFocused()
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
})();
  }, []);
const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri)
  }
}

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  else if (isFocused){
  return (
   <View style={{ flex: 1}}>
    <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={Camera.Constants.Type.back}
            ratio={'1:1'} />
      </View>
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
        {image && <Button title='Confirm Image' onPress={() => navigation.navigate('ConfirmImage', {image})}/>}
   </View>
  );
  }
  else{
    return <View></View>
  }
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
})
