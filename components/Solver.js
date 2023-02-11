import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable, Modal, TextInput, ActivityIndicator } from 'react-native';
import {getBoxes, getCols,getPossibles,getRows,naked_singles,hidden_singles} from './SolveAlgo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Solver ({ route, navigation }) {
  const [grid, setGrid] = useState(route.params.grid);
  const [givens, setGivens] = useState(getGivens(route.params.grid))
  const [selectedCell, setselectedCell] = useState(null);
  const [selectedNum, setselectedNum] = useState(null)
  const [modalVisible, setmodalVisible] = useState(false)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function Save(){
    let keys = []
    keys = await AsyncStorage.getAllKeys()
    if (keys.includes(text)){
      alert(`Please choose a name that has not already been saved, ${text} already exists.`)
    }
    else{
      const gridJson = JSON.stringify({grid})
      await AsyncStorage.setItem(text, gridJson)
      navigation.navigate('Start')
    }
  }

  function SolvePuzzle(){
    const Solve = fullSolve(grid)
    const reverseSolve = fullSolve(grid,true)
    if (JSON.stringify(Solve) == JSON.stringify(reverseSolve)){
      if (Solve){
        setGrid(Solve)
      }
      else {
        alert('This puzzle has no solution')
      }
    }
    else {
      alert('This puzzle has no unique solution')
    }
    setLoading(false)
  }

  function fullSolve(grid, reverse=false){
    const grouptypes = [getRows(grid),getCols(grid), getBoxes(grid)]
    for (let groups of grouptypes){
        for (let group of groups){
            const counts = [0,0,0,0,0,0,0,0,0,0]
            for (let i = 0; i<9; i++){
                counts[group[i]] += 1
            }
            counts[0] = 0 // Ignore if there is more than one zero in a row, column or box as these cells aren't filled
            for (let count of counts){
                if (count > 1){
                    return false
                }
            }
        }
    }
    for (let i=0; i<grid.length; i++){
        if (grid[i] == 0){ // If grid is not full fill with a digit and then try to solve the new grid created
            for (let x=1; x<10; x++){
                var tempgrid = grid.slice()
                if (reverse){
                    tempgrid[i] = 10-x
                }
                else {
                    tempgrid[i] = x
                }
                var solvable = fullSolve(tempgrid)
                if (solvable){
                    return solvable
                }
            }
            return false
        }
    }
    return grid
}

  function nextStep(grid){
    let possibles = getPossibles(grid.slice())
    const naked_single = naked_singles(possibles)
    if (naked_single){
        grid[naked_single[0]] = naked_single[1]
        setselectedCell(naked_single[0])
        alert(`cell ${naked_single[0]} can be solved as ${naked_single[1]} because no other digit can be placed in that cell.`)
        return grid
    }
    const hidden_single = hidden_singles(possibles)
    if (hidden_single){
        grid[hidden_single[0]] = hidden_single[1]
        setselectedCell(hidden_single[0])
        alert(`cell ${hidden_single[0]} can be solved as ${hidden_single[1]} because that cell can't be placed anywhere else in that ${hidden_single[2]}.`)
        return grid
    }
}

  function getGivens(givenGrid){
    const given = []
    for (let i = 0 ; i < 81; i++){
      if (givenGrid[i] != 0){
        given.push(i)
      }
    }
    return given
  }

  function SelectCell(cell){
    if (!givens.includes(cell)){
      if (selectedCell === cell){
        setselectedCell(null)
      }
      setselectedCell(cell)
      if (selectedNum){
        Change(selectedNum, cell)
      }
    }
  }

  function SelectNum(num){
    if (selectedNum === num){
      setselectedNum(null)
    }
    setselectedNum(num)
    if (selectedCell){
      Change(num, selectedCell)
  }
  }

  function Change(num, cell){

      const newGrid = grid
      if (num == 'remove'){
        newGrid[cell] = 0
      }
      else {
        newGrid[cell] = num
      }
      setGrid(newGrid)
      setselectedCell(null)
      setselectedNum(null)
  }

  function breaksRules(index){
    const Seen = []
    for (let i = 0; i < 9; i++){
      Seen.push(index%9 + i*9)
      Seen.push(Math.floor(index/9)*9+i)
      Seen.push(Math.floor(index/27)*27 + Math.floor((index%9)/3)*3 + i%3 + Math.floor(i/3)*9)
    }
    Seen.splice(Seen.indexOf(index),1)
    Seen.splice(Seen.indexOf(index),1)
    Seen.splice(Seen.indexOf(index),1)
    for (let cell of Seen){
      if (grid[cell] == grid[index] && grid[index] != 0){
        return true
      }
    }
    return false
  }

  return (
    <View style={styles.container}> 
    <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}>
        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginTop: 22}}>
          <View style={{margin: 20,backgroundColor: 'white',borderRadius: 20,padding: 35,alignItems: 'center',elevation:5}}>
            <TextInput style={{marginBottom: 15,textAlign: 'center'}} onChangeText={(text) => {setText(text)}} placeholder='Name Puzzle'></TextInput>
            <Pressable
              style={{borderRadius: 20,padding: 10,elevation: 2,backgroundColor:'#F194FF'}}
              onPress={() => Save()}>
              <Text style={styles.textStyle}>Save Name</Text>
            </Pressable>
          </View>
        </View>
      </Modal>  
      <View style={styles.gridContainer}>
      {grid.map((value, index) => (
          <Pressable style={[
            styles.cellButton,
            index===selectedCell ? {backgroundColor: '#a9a9a9'} : null,
            breaksRules(index) ? {backgroundColor: 'rgba(255,55,55,0.6)'} : null,
            (index===selectedCell && breaksRules(index)) ? {backgroundColor: 'rgba(255,55,55,1)'} : null,
            (index % 9)%3 === 0 ? { borderLeftWidth: 2 } : null,
            (index % 9)%3 === 2 ? { borderRightWidth: 2 } : null,
            Math.floor(index/9) % 3 == 0 ? { borderTopWidth: 2 } : null,
            Math.floor(index/9) % 3 == 2 ? { borderBottomWidth: 2 } : null,
            ]} 
            key={index}
            onPress={() => SelectCell(index)}
          >
            {value != 0 ? <Text style={[styles.cellText, (givens.includes(index) ? {color: 'black'} : {color: 'blue'})]}> {value} </Text> : <Text></Text>}
          </Pressable>
      ))}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.digitContainer}>   
        {[1,2,3,4,5,6,7,8,9].map((value,index) => (
          <Pressable style={[styles.digitBox, index+1===selectedNum ? {backgroundColor: '#a9a9a9'} : null,]} key={index*1000} onPress={() => SelectNum(index+1)}>
            <Text style={styles.digitText}> {value != 0 ? value : 'Clear'} </Text>
          </Pressable>
        ))}
         <Pressable style={[styles.removeButton, 'remove'===selectedNum ? {backgroundColor: '#a9a9a9'} : null,]} key={10000} onPress={() => SelectNum('remove')}>
            <Text style={styles.removeText}> Clear Cell </Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.solverButton}>
            <Pressable onPress={() => setGrid(nextStep(grid))}>
              <Text style={{fontSize:30, color:'#ffffff', textAlign: 'center'}}>Next Digit</Text>
            </Pressable>
          </View>
          <View style={styles.solverButton}>
            <Pressable onPress={() => {SolvePuzzle()}}>
              <Text style={{fontSize:30, color:'#ffffff', textAlign: 'center'}}>Solve Fully</Text>
            </Pressable>
          </View>
          <View style={styles.solverButton}>
            <Pressable onPress={() => setmodalVisible(true)}>
              <Text style={{fontSize:28, color:'#ffffff', textAlign: 'center'}}>Save Puzzle</Text>
            </Pressable>
          </View>
        </View>
      </View> 
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.get('window').width*0.05,
    flexDirection: 'column',
  },
  bottomContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  gridContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cellButton: {
    borderWidth: 1,
    width: Dimensions.get('window').width*0.9/9,
    height: Dimensions.get('window').width*0.9/9,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  digitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  digitBox: {
    borderWidth: 1,
    borderColor: 'black',
    width: Dimensions.get('window').width*0.70 / 5,
    height: Dimensions.get('window').width*0.70 / 5,
  }, 
  removeButton: {
    borderWidth: 1,
    borderColor: 'black',
    width: Dimensions.get('window').width*0.70 / 5 * 3,
    height: Dimensions.get('window').width*0.70 / 6,
  }, 
  cellText: {
    fontSize: 28,
    textAlign: 'center',
  },
  removeText: {
    fontSize: 26,
    textAlign: 'center',
  },
  digitText: {
    fontSize: 40,
    textAlign: 'center',
  },
  solverButton: {
    flex:1,
    width: '100%',
    marginTop: '5%',
    marginBottom: '5%',
    height: '80%',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'lightblue'
  },
});
