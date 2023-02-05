import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { fullSolve, nextStep } from './SolveAlgo';

export default function Setter ({ route, navigation }) {
  const [grid, setGrid] = useState(route.params.grid);
  const [selectedCell, setselectedCell] = useState(null);
  const [selectedNum, setselectedNum] = useState(null);

  function SelectCell(cell){
    if (selectedCell === cell){
      setselectedCell(null)
    }
    setselectedCell(cell)
    if (selectedNum){
        Change(selectedNum, cell)
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

  function toSolver(){
    for (let i = 0; i<grid.length; i++){
      if (breaksRules(i)){
        alert("Can't go to solve because grid is invalid")
        return null
      }
    }
    navigation.navigate('Solver', {grid})
  }

  return (
    <View style={styles.container}>
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
            {value != 0 ? <Text style={styles.cellText}> {value} </Text> : <Text></Text>}
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
            <Text style={styles.removeText}> Remove Cell </Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable onPress={() => toSolver()} title='Begin Solve' styles={styles.solverButton}>
              <Text style={{fontSize: 50, color:'#ffffff', textAlign: 'center'}}>Begin Solve</Text>
            </Pressable>
        </View>
      </View>
    </View>
  );
};

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
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    height: '60%',
    flex: 1,
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
    borderWidth: 1,
    width: '100%',
  },
});
