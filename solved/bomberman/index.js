'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

const BOMB = 'O';
const EMPTY = '.';

const getColumns = gridItem => gridItem.split('');

const fillColumns = gridItem => {
  const changed = [];
  const result = getColumns(gridItem).map((i, index) => {
    if (i !== BOMB) changed.push(index);

    return BOMB;
  });
  
  return { changed, result };
};

const fillAllColumns = grid => grid.reduce((acc, item) => {
  const { changed, result } = fillColumns(item);
  
  acc.changed.push(changed);
  acc.result.push(result.join(''));

  return acc;
}, { changed: [], result: [] });

const detonateIndexes = (grid, detonations) => {
  const gridCopy = [...grid];

  return grid.reduce((acc, _, index) => {
    const columns = getColumns(gridCopy[index]);
    
    detonations[index].forEach(idx => {
      if (acc[index - 1]) {
        const columnsBefore = getColumns(acc[index - 1]);
        columnsBefore[idx] = EMPTY;
        acc[index - 1] = columnsBefore.join('');
      }
      
      if (gridCopy[index + 1]) {
        const columnsAfter = getColumns(gridCopy[index + 1]);
        columnsAfter[idx] = EMPTY;
        gridCopy[index + 1] = columnsAfter.join('');
      }

      columns[idx] = EMPTY;

      if (columns[idx - 1]) columns[idx - 1] = EMPTY;
      if (columns[idx + 1]) columns[idx + 1] = EMPTY;
    });
    
    return [...acc, columns.join('')];
  }, []);
};

const getBombsPlaced = grid => grid.reduce((acc, item) => {
  const columns = getColumns(item);
  
  acc.push(columns.reduce((bombs, c, index) => {
    if (c === BOMB) bombs.push(index);

    return bombs;
  }, []));
  
  return acc;
}, []);

function bomberMan(n, grid) {
  // Write your code here
  console.log('n, grid', n, grid);
  
  const history = [];
  let currentGrid = [...grid];

  for (let i = 1; i <= n; ++i) {
    // Initially, Bomberman arbitrarily plants bombs in some of the cells, the initial state.
    // After one second, Bomberman does nothing.
    // After one more second, Bomberman plants bombs in all cells without bombs, thus filling the whole grid with bombs. No bombs detonate at this point.
    // After one more second, any bombs planted exactly three seconds ago will detonate. Here, Bomberman stands back and observes.
    // Bomberman then repeats steps 3 and 4 indefinitely.

    let actionPerformed;
    
    if (i % 1 === 0) {
      console.log('should do nothing');
      const bombsPlaced = getBombsPlaced(currentGrid);
    
      console.log('bombsPlaced', bombsPlaced);

      actionPerformed = bombsPlaced;
    }
    
    // ? Playable round
    if (i % 2 === 0) {
      console.log('should fill bombs');

      const newValues = fillAllColumns(currentGrid);
      console.log('new', newValues);
      
      currentGrid = newValues.result;
      
      actionPerformed = newValues.changed;
    }
    
    if (i % 3 === 0) {
      console.log('should detonate', history[i - 3]);

      currentGrid = detonateIndexes(currentGrid, history[i - 3]);
      
      actionPerformed = getBombsPlaced(currentGrid);
    }
    
    history.push(actionPerformed);
  }
  
  return currentGrid;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const r = parseInt(firstMultipleInput[0], 10);

  const c = parseInt(firstMultipleInput[1], 10);

  const n = parseInt(firstMultipleInput[2], 10);

  let grid = [];

  for (let i = 0; i < r; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = bomberMan(n, grid);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
