
// grid stored as 1D array length 81
const mainGrid = [5, 3, 0, 0, 7, 0, 0, 0, 0,
    6, 0, 0, 1, 9, 5, 0, 0, 0,
    0, 9, 8, 0, 0, 0, 0, 6, 0,
    8, 0, 0, 0, 6, 0, 0, 0, 3,
    4, 0, 0, 8, 0, 3, 0, 0, 1,
    7, 0, 0, 0, 2, 0, 0, 0, 6,
    0, 6, 0, 0, 0, 0, 2, 8, 0,
    0, 0, 0, 4, 1, 9, 0, 0, 5,
    0, 0, 0, 0, 8, 0, 0, 7, 9]

/* Solution

[5, 3, 4, 6, 7, 8, 9, 1, 2,
6, 7, 2, 1, 9, 5, 3, 4, 8,
1, 9, 8, 3, 4, 2, 5, 6, 7,
8, 5, 9, 7, 6, 1, 4, 2, 3,
4, 2, 6, 8, 5, 3, 7, 9, 1,
7, 1, 3, 9, 2, 4, 8, 5, 6,
9, 6, 1, 5, 3, 7, 2, 8, 4,
2, 8, 7, 4, 1, 9, 6, 3, 5,
3, 4, 5, 2, 8, 6, 1, 7, 9]

*/

function getPossibles(grid){
    var possibles = grid.slice()
    for (let i = 0; i<grid.length; i++){
        if (grid[i] == 0){
            possibles[i] = new Set([1,2,3,4,5,6,7,8,9])
            const connected = [...getRows(grid,Math.floor(i/9)),...getCols(grid,i%9),...getBoxes(grid,Math.floor((i%9)/3) + 3*Math.floor((i/27)))]
            for (let num of connected){
                possibles[i].delete(num)
            }
        }
    }
    return possibles
}

function getRows(grid, index=-1){
    var rows = []
    for (let i =0; i < 9; i++){
        rows.push(grid.slice(i*9, i*9+9))
    }
    if (index==-1){
        return rows
    }
    return rows[index]
}

function getCols(grid, index=-1){
    var cols = [[],[],[],[],[],[],[],[],[]]
    for (let i =0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            cols[i].push(grid[j*9+i])
        }
    }
    if (index==-1){
        return cols
    }
    return cols[index]
}

function getBoxes(grid, index=-1){
    var boxes = [[],[],[],[],[],[],[],[],[]]
    for (let i = 0; i<grid.length; i++){
        const boxNum = Math.floor((i%9)/3) + 3*Math.floor((i/27))
        boxes[boxNum].push(grid[i])
    }
    if (index==-1){
        return boxes
    }
    return boxes[index]
}

function naked_singles(possibles) {
    for (let i=0; i<possibles.length; i++){
        if (possibles[i].size === 1) {
            return [i, possibles[i].values().next().value]
        }
    }
    return false;
} 

function hidden_singles(possibles) {
    let SectionPossibles = [getRows(possibles),getCols(possibles),getBoxes(possibles)]
    for (let i=0; i<SectionPossibles.length; i++){ //Loops through the lists of Rows, Columns and Boxes
        let GroupPossibles = SectionPossibles[i]
        for (let j=0; j<GroupPossibles.length; j++){ //Loops through each Row, Column or Box in the Grid
            let Group = GroupPossibles[j]
            const counts = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[]}
            for (let k = 0; k<Group.length; k++){ //Loops through the specific Row, Column or Box specified by J
                if (Group[k].size){
                    for (let digit of Group[k]){
                        counts[digit].push(k) //Adds index of digit to counts dict with key representing digit
                    }
                }
            }
            for (let digit in counts){
                if (counts[digit].length == 1){ //Finds any digits only found to be possible in one cell within specific Row, Column or Box. 
                                                // Counts[digit][0] is the index within this Row, Column or Box where that digit is found.
                                                // j is the specific Row, Column or Box that the cell is in
                    if (i == 0){ // Row 
                        var index = j*9 + counts[digit][0] 
                        var group = 'row'
                    }
                    else if (i == 1){ // Column
                        var index = counts[digit][0]*9 + j
                        var group = 'column'
                    }
                    else { // Box
                        var index = 27*Math.floor(j/3) + 3*(j%3) + 9*Math.floor(counts[digit][0]/3) + counts[digit][0]%3
                        var group = 'box'
                    }
                    return [index, Number(digit), group]
                }
            }
        }
    }
    return false
}

export {getBoxes, getCols,getPossibles,getRows,naked_singles,hidden_singles};