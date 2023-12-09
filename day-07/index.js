const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const inputArray = input.split('\n').map((line) => line.split(' '));

const countAlphabets = (string) => {
  const table = {};
  for (const char of string) {
    if (char in table) {
      table[char]++;
    } else {
      table[char] = 1;
    }
  }
  // Part 2
  if ('J' in table) {
    const j = table.J;
    if (j === 5) return table;
    delete table.J;
    const maxChar = Object.entries(table).sort((a, b) => b[1] - a[1])[0][0];
    table[maxChar] += j;
  }

  return table;
};

const getType = (hand) => {
  const table = countAlphabets(hand);
  const sortedValue = Object.values(table).sort((a, b) => b - a);
  if (sortedValue[0] === 5) {
    return '5oaK';
  }
  if (sortedValue[0] === 4) {
    return '4oaK';
  }
  if (sortedValue[0] === 3) {
    if (sortedValue[1] === 2) {
      return 'fullHouse';
    }
    return '3oaK';
  }
  if (sortedValue[0] === 2) {
    if (sortedValue[1] === 2) {
      return '2Pair';
    }
    return '1Pair';
  }
  return 'highCard';
};

const compareCardByCard = (hand1, hand2) => {
  // const cards = 'AKQJT98765432';
  // Part 2
  const cards = 'AKQT98765432J';
  for (let i = 0; i < 5; i++) {
    const char1 = hand1[i];
    const char2 = hand2[i];
    if (cards.indexOf(char1) < cards.indexOf(char2)) {
      return 1;
    }
    if (cards.indexOf(char1) > cards.indexOf(char2)) {
      return -1;
    }
  }
  throw new Error(`${hand1} and ${hand2} are equal?`);
};

inputArray.sort(([hand1], [hand2]) => {
  const types = [
    '5oaK',
    '4oaK',
    'fullHouse',
    '3oaK',
    '2Pair',
    '1Pair',
    'highCard',
  ];
  const type1 = getType(hand1);
  const type2 = getType(hand2);
  if (type1 !== type2) {
    return types.indexOf(type2) - types.indexOf(type1);
  }
  return compareCardByCard(hand1, hand2);
});

const totalWinning = inputArray.reduce((winning, curr, index) => winning + curr[1] * (index + 1), 0);
console.log(totalWinning);
