const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const cardsArray = input
  .split('\n')
  .map((line) => line.split(': '))
  .map((lineArray) => [+lineArray[0].slice(4), lineArray[1].split(' | ')])
  .map((lineArray) => [
    lineArray[0],
    lineArray[1][0]
      .split(' ')
      .filter((ele) => ele !== '')
      .map((str) => +str),
    lineArray[1][1]
      .split(' ')
      .filter((ele) => ele !== '')
      .map((str) => +str),
  ]);

const points = cardsArray.reduce((sum, card) => {
  let matching = 0;
  card[2].forEach(number => {
    if (card[1].includes(number)) {
      matching++;
    }
  });
  return matching === 0 ? sum : sum + 2**(matching - 1);
}, 0);
console.log(points);

// Part 2
const matchingList = cardsArray.map(card => {
  let matching = 0;
  card[2].forEach(number => {
    if (card[1].includes(number)) {
      matching++;
    }
  });
  return matching;
})

const copiesList = new Array(cardsArray.length).fill(1);

matchingList.forEach((matching, index) => {
  const copies = copiesList[index];
  for (let i = 0; i < matching; i++) {
    copiesList[index + 1 + i] += copies; 
  }
});

const totalCards = copiesList.reduce((sum, copies) => sum + copies);
console.log(totalCards);