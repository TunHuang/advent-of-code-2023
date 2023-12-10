const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const sequencesArray = input.split('\n').map(line => line.split(' ').map(Number));

sequencesArray.forEach(sequence => {
  // make diffArrays
  const diffArrays = [sequence];
  do {
    diffArrays.push([]);
    for (let i = 0; i < diffArrays.at(-2).length - 1; i++) {
      diffArrays.at(-1).push(diffArrays.at(-2)[i + 1] - diffArrays.at(-2)[i]);
    }
  } while (diffArrays.at(-1).some(number => number !== 0));

  // Part 1
  // predict last value
  diffArrays.at(-1).push(0);
  for (let i = diffArrays.length - 2; i >= 0; i--) {
    diffArrays[i].push(diffArrays[i].at(-1) + diffArrays[i + 1].at(-1));
  }

  // Part 2
  // predict first value
  diffArrays.at(-1).unshift(0);
  for (let i = diffArrays.length - 2; i >= 0; i--) {
    diffArrays[i].unshift(diffArrays[i][0] - diffArrays[i + 1][0]);
  }
})

// Part 1
const sumExtrapolatedLastValues = sequencesArray.reduce((sum, sequence) => sum + sequence.at(-1), 0);
console.log(sumExtrapolatedLastValues);
// Part 2
const sumExtrapolatedFirstValues = sequencesArray.reduce((sum, sequence) => sum + sequence[0], 0);
console.log(sumExtrapolatedFirstValues);