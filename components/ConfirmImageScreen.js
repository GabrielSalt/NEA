import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Svg, {Line, Circle, Rect, SvgUri } from 'react-native-svg';
import { manipulateAsync } from 'expo-image-manipulator';

const url = "http://13.40.121.151:5002/"

export default function ConfirmImageScreen( {route, navigation}) {
    const [image, setImage] = useState(route.params.image)
    const [prompt, setPrompt] = useState('Please click on the top left corner of the sudoku grid')
    const [topLeft, setTopLeft] = useState([0,0])
    const [bottomRight, setBottomRight] = useState([0,0])
    const [Selected, setSelected] = useState(false)
    const [Lines, setLines] = useState([])
    const [SrcDimensions, setSrcDimensions] = useState(null)

    function HandlePress(evt){
      if (prompt == 'Please click on the top left corner of the sudoku grid'){
        setTopLeft([evt.nativeEvent.locationX,evt.nativeEvent.locationY])
      }
      else {
        setBottomRight([evt.nativeEvent.locationX,evt.nativeEvent.locationY])
        setSelected(true)
      }
    }

    useEffect(() => {
      const topright = [bottomRight[0], topLeft[1]]
      const bottomleft = [topLeft[0], bottomRight[1]]
      var lines = []
      for (let x = 0; x < 10; x++){

          // Horizontal Lines
          var x1 = topLeft[0]
          var x2 = topright[0]
          var y1 = topLeft[1] + Math.round(x*(bottomleft[1]-topLeft[1])/9)
          var y2 = topLeft[1] + Math.round(x*(bottomleft[1]-topLeft[1])/9)
          var strokeWidth = 1
          if (x == 3 || x == 6){strokeWidth = 2}
          else if (x == 0 || x == 9){strokeWidth = 3}

          var lineInfo = { x1, x2, y1, y2, strokeWidth }
          lines.push(lineInfo)
          // Vertical Lines
          var x1 = topLeft[0] + Math.round(x*(bottomRight[0]-topLeft[0])/9)
          var x2 = topLeft[0] + Math.round(x*(bottomRight[0]-topLeft[0])/9)
          var y1 = topLeft[1]
          var y2 = bottomleft[1]
          var strokeWidth = 0.25
          if (x % 3 == 0){strokeWidth = 2}

          var lineInfo = { x1, x2, y1, y2, strokeWidth }
          lines.push(lineInfo)
        }
        setLines(lines)
        if (!SrcDimensions){
          Image.getSize(image, (srcWidth, srcHeight) => {
            setSrcDimensions(srcWidth)
          })
        }
    }, [topLeft, bottomRight])

    async function readGrid(){
      const croppedImage = await manipulateAsync(image, [{ resize: { width: Dimensions.get('window').width } }, { crop: { height: bottomRight[1]-topLeft[1],  originX: topLeft[0],  originY: topLeft[1], width: bottomRight[0]-topLeft[0] }} ], { base64: true })
      // Make API call to read digits
      const response = await fetch(url, {
        method: 'POST', // GET, POST, PUT, DELETE etc.
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
        },
        body: JSON.stringify({"img": croppedImage.base64.toString()})
      });
      var grid = await response.json();
      grid = JSON.parse(grid);
      grid = grid.message.slice(2,grid.message.length-2)
      grid = JSON.parse(grid)
      navigation.navigate('Setter', {grid})
    }

    return ( 
      <View style={styles.Container}>
        <TouchableOpacity onPress={(evt) => HandlePress(evt)}>
          <ImageBackground width='100%' height={Dimensions.get('window').width} source={{uri: image}}>
          <Svg width='100%' height={Dimensions.get('window').width} >
                {(topLeft != [0,0]) && <Circle 
                cx={topLeft[0]}
                cy={topLeft[1]}
                r='5'
                fill='red'
                />}
                {(bottomRight != [0,0]) && <Circle 
                cx={bottomRight[0]}
                cy={bottomRight[1]}
                r='5'
                fill='red'
                />}
                {Lines.map((line,index) => {
                  return(
                  <Line
                    key={index}
                    x1={line['x1']}
                    x2={line['x2']}
                    y1={line['y1']}
                    y2={line['y2']}
                    stroke='red'
                    strokeWidth={line['strokeWidth']}
                  />)
                })}
            </Svg>
            </ImageBackground>
        </TouchableOpacity>
        {!Selected && <Text> {prompt} </Text>}
        {Selected && <Text> Check that all digits are within their cell </Text>}
        <Button title='Edit Top Left' onPress={() => setPrompt('Please click on the top left corner of the sudoku grid')}></Button>
        <Button title='Edit Bottom Right' onPress={() => setPrompt('Please click on the bottom right corner of the sudoku grid')}></Button>
        {Selected && <Button title="Continue to Setter" onPress={() => readGrid()}/>}
      </View>
    )
}

const styles = StyleSheet.create({
  Image: {
      marginTop: '30%',
      width: '100%',
      aspectRatio: 1,
  },
  Container: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      width: '100%',
      height: '50%',
  },
  ButtonContainer: {
      marginTop: '90%',
      alignSelf: 'center',
  },
});