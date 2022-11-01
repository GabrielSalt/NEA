import Icon from 'react-native-vector-icons/Feather';
import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Svg, {Line, Circle, Rect, SvgUri } from 'react-native-svg';
import * as ImageManipulator from 'expo-image-manipulator';
import { decode } from 'base64-arraybuffer';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';

const modelJson = require('../assets/model/model.json');
const modelWeights = require('../assets/model/model_weights.bin');

export default function ConfirmScreen( {route, navigation}) {
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

    const loadModel = async()=>{
      await tf.ready()
      console.log('About to load!')
          const Model = await tf.loadLayersModel(
              bundleResourceIO(modelJson, modelWeights)
          ).catch((e)=>{
            console.log("[LOADING ERROR] info:",e)
          })
          console.log('Loaded!')
          return Model
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

    const transformImageToTensor = async (img64)=>{
      //read the image as base64
        const imgBuffer =  tf.util.encodeString(img64, 'base64').buffer
        const raw = new Uint8Array(imgBuffer)
        await tf.ready()
        let imgTensor = decodeJpeg(raw)
        let rgb_weights = [0.2989, 0.5870, 0.1140]
        imgTensor = tf.mul(imgTensor, rgb_weights).toInt()
        imgTensor = tf.sum(imgTensor, -1)
        imgTensor = tf.expandDims(imgTensor, -1)
        //resize the image
        imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [28,28])
      //final shape of the rensor
        const img = tf.reshape(imgTensor, [1,28,28,1])
        return img
    }

    async function readGrid(){
      const model = await loadModel()
      let nums = []
      const width = Math.round((bottomRight[0] - topLeft[0])/9)
      const height = Math.round((bottomRight[1] - topLeft[1])/9)
      const ScreenDimensions = Dimensions.get('window').width
      for (let x = 0; x < 9; x++){
        for (let y = 0; y < 9; y++){
          if (y == 0 && x==4){
            var originX = Math.round(topLeft[0] + x*(bottomRight[0]-topLeft[0])/9)
            var originY = Math.round(topLeft[1] + y*(bottomRight[1]-topLeft[1])/9)
            var cellImage = await ImageManipulator.manipulateAsync(
              image, 
              [
                  { crop: { height: height*SrcDimensions/ScreenDimensions*2, originX: originX*SrcDimensions/ScreenDimensions*2, originY: originY*SrcDimensions/ScreenDimensions*2, width: width*SrcDimensions/ScreenDimensions*1.8}}, 
              ],
              { format: 'jpeg', base64: true}
          )
          setImage(cellImage.uri) 
          var tensor = await transformImageToTensor(cellImage.base64)
          zeros = tf.zeros([1,28,28,1])
          onetwoseven = tf.scalar(127)
          twofivefive = tf.scalar(255)
          ones = tf.ones([1,28,28,1])
          onetwosevens = tf.mul(ones, onetwoseven).reshape([1,28,28,1])
          twofivefives = tf.mul(ones, twofivefive).reshape([1,28,28,1])
          tensor = zeros.where(tensor.greater(onetwosevens), twofivefives)
          var prediction = await model.predict(tensor)
          prediction = prediction.dataSync()
          console.log(prediction)
          nums.push(prediction)
          }
        }
      }
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