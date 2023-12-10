const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const testinput = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
const testinput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`
const testinput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const [instructions, inputRest] = input.split('\n\n');
// const [instructions, inputRest] = input.split('\n\n');
const maps = inputRest
  .split('\n')
  .map((line) => line.split(' = '))
  .map(lineArr => [lineArr[0], lineArr[1].slice(1, -1).split(', ')])
const mapsObj = Object.fromEntries(maps);
// console.log(mapsObj);

// Part 1
// let steps = 0;
// let current = 'AAA';
// const DESTINATION = 'ZZZ';

// while (current !== DESTINATION) {
//   const direction = instructions[steps % instructions.length];
//   const instruction = mapsObj[current];
//   current = direction === 'L' ? instruction[0] : instruction[1];
//   steps++;
// }
// console.log(steps);

// Part 2

// Brute Force
// let currentNodes = maps.reduce((list, [currNode]) => currNode.endsWith('A') ? [...list, currNode] : list, []);
// console.log(currentNodes);
// let arrived = false;
// let steps = 0;

// while (!arrived) {
//   const direction = instructions[steps % instructions.length];
//   currentNodes = currentNodes.map(node => {
//     const instruction = mapsObj[node];
//     return direction === 'L' ? instruction[0] : instruction[1];
//   });
//   console.log("next nodes:", currentNodes);
//   steps++;
//   arrived = currentNodes.every(node => node.endsWith('Z'));
// }
// console.log(steps);

// idea with something similar as lcm. Still don't know how to calc it with the offsets. Bézout's identity? Chinese remainder theorem
/* 
    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }
*/
const startingNodes = maps.reduce((list, [currNode]) => currNode.endsWith('A') ? [...list, currNode] : list, []);

const patternList = startingNodes.map(node => {
  let currentNode = node;
  const history = [currentNode];
  let arrived = false;
  let steps = 0;
  while (!arrived) {
    const direction = instructions[steps % instructions.length];
    const instruction = mapsObj[currentNode];
    currentNode = direction === 'L' ? instruction[0] : instruction[1];
    history.push(currentNode);
    steps++;
    arrived = currentNode.endsWith('Z');
  }
  const direction = instructions[steps % instructions.length];
  const instruction = mapsObj[currentNode];
  const nextNode = direction === 'L' ? instruction[0] : instruction[1];
  const index = history.indexOf(nextNode);
  return {historyLength: history.length, index, loopLength: history.length - index};
});
console.log(patternList);

const modularMultiplicativeInverse = (a, modulus) => {
  // Calculate current value of a mod modulus
  const b = a % modulus;
    
    // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
    for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
        if ((b * hipothesis) % modulus == 1n) return hipothesis;
    }
      // If we do not find it, we return 1
    return 1n;
}

const solveCRT = (remainders, modules) => {
  // Multiply all the modulus
  const prod = modules.reduce((acc, val) => acc * val, 1n);
  
  return modules.reduce((sum, mod, index) => {
      // Find the modular multiplicative inverse and calculate the sum
  // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
      const p = prod / mod;
      return sum + (remainders[index] * modularMultiplicativeInverse(p, mod) * p);
  }, 0n) % prod;
}

function crt(num, rem) {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c, 1);

  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return sum % prod;
}

function mulInv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];

  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}

const remainderList = patternList.reduce((arr, pattern) => [...arr, pattern.index - 1], []);
const remainderListBigInt = remainderList.map(BigInt);
const modulesList = patternList.reduce((arr, pattern) => [...arr, pattern.loopLength], []);
const modulesListBigInt = modulesList.map(BigInt);
console.log(remainderListBigInt, modulesListBigInt);
const solution = solveCRT(remainderListBigInt, modulesListBigInt);
console.log(solution);