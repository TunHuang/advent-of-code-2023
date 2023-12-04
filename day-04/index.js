const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const cardsArray = input
  .split('\n')
  .map((line) => line.slice(10))
  .map((line) =>
    line.split(' | ').map((numbers) =>
      numbers
        .split(' ')
        .filter((ele) => ele !== '')
        .map((numStr) => +numStr)
    )
  );

const matchingList = cardsArray.map((card) => {
  let matching = 0;
  card[1].forEach((number) => {
    if (card[0].includes(number)) {
      matching++;
    }
  });
  return matching;
});

const points = matchingList.reduce(
  (sum, matching) => (matching === 0 ? sum : sum + 2 ** (matching - 1)),
  0
);
console.log(points);

// // Part 2
const countSelfAndSpawnedCards = (matchArr, index) => {
  let cards = 1;
  for (let i = 0; i < matchArr[index]; i++) {
    cards += countSelfAndSpawnedCards(matchArr, index + 1 + i);
  }
  return cards;
};

const sum = matchingList.reduce(
  (sum, _, i, arr) => sum + countSelfAndSpawnedCards(arr, i),
  0
);
console.log(sum);
