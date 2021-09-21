function sudoku2(grid) {
  const foundNumbers = new Map();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const val = grid[i][j];
      if (val === '.') continue;

      const rowKey = `row-${i}`;
      const colKey = `col-${j}`;
      // 3x3
      const subGridKey = `subGrid-${Math.floor(i / 3)}-${Math.floor(j / 3)}`;

      if (!foundNumbers.has(rowKey)) foundNumbers.set(rowKey, new Set([val]));
      else if (foundNumbers.get(rowKey).has(val)) return false;
      else foundNumbers.get(rowKey).add(val);

      if (!foundNumbers.has(colKey)) foundNumbers.set(colKey, new Set([val]));
      else if (foundNumbers.get(colKey).has(val)) return false;
      else foundNumbers.get(colKey).add(val);

      if (!foundNumbers.has(subGridKey)) foundNumbers.set(subGridKey, new Set([val]));
      else if (foundNumbers.get(subGridKey).has(val)) return false;
      else foundNumbers.get(subGridKey).add(val);
    }
  }

  return true;
}

// Should be false
const output = sudoku2([
  ['.', '4', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '1', '.', '.', '7', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '3', '.', '.', '.', '6', '.'],
  ['.', '.', '.', '.', '.', '6', '.', '9', '.'],
  ['.', '.', '.', '.', '1', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '2', '.', '.'],
  ['.', '.', '.', '8', '.', '.', '.', '.', '.'],
]);

console.log('output', output);
