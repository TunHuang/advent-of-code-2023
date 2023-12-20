const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const testInput = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const testInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`

const inputMatrix = input.split('\n');

const findStartingPosition = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 'S') return { y, x };
    }
  }
  throw new Error('No Starting Position found');
};
const startingPosition = findStartingPosition(inputMatrix)

const findStartingType = (y, x, matrix) => {
  const connectedToTop = ['|', '7', 'F'].includes(matrix[y - 1]?.[x]);
  const connectedToRight = ['-', 'J', '7'].includes(matrix[y][x + 1]);
  const connectedToBottom = ['|', 'L', 'J'].includes(matrix[y + 1]?.[x]);
  const connectedToLeft = ['-', 'L', 'F'].includes(matrix[y][x - 1]);
  if (connectedToTop && connectedToBottom) {
    return '|';
  }
  if (connectedToLeft && connectedToRight) {
    return '-';
  }
  if (connectedToTop && connectedToRight) {
    return 'L';
  }
  if (connectedToTop && connectedToLeft) {
    return 'J';
  }
  if (connectedToBottom && connectedToLeft) {
    return '7';
  }
  if (connectedToBottom && connectedToRight) {
    return 'F';
  }
};

const walkTheLoop = (y, x, matrix) => {
  const steps = [];
  let lastStep = {};
  const position = { y, x };
  do {
    steps.push(`${position.y} ${position.x}`);
    const currentPosition = {...position};
    const type =
      inputMatrix[position.y][position.x] === 'S'
        ? findStartingType(y, x, matrix)
        : inputMatrix[position.y][position.x];
    switch (type) {
      case '|':
        if (position.y - 1 === lastStep.y) {
          position.y++;
        } else {
          position.y--;
        }
        break;
      case '-':
        if (position.x - 1 === lastStep.x) {
          position.x++;
        } else {
          position.x--;
        }
        break;
      case 'L':
        if (position.y - 1 === lastStep.y) {
          position.x++;
        } else {
          position.y--;
        }
        break;
      case 'J':
        if (position.y - 1 === lastStep.y) {
          position.x--;
        } else {
          position.y--;
        }
        break;
      case '7':
        if (position.x - 1 === lastStep.x) {
          position.y++;
        } else {
          position.x--;
        }
        break;
      case 'F':
        if (position.y + 1 === lastStep.y) {
          position.x++;
        } else {
          position.y++;
        }
        break;
      default:
        throw Error(`unknown type? ${type}`);
    }
    Object.assign(lastStep, currentPosition);
  } while (inputMatrix[position.y][position.x] !== 'S');
  return steps;
};
const loop = walkTheLoop(startingPosition.y, startingPosition.x, inputMatrix);
console.log(loop);
const farthest = loop.length / 2;
console.log(farthest);