const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const gamesArray = input
  .split('\n')
  .map((line) => line.split(': '))
  .map((game) => [
    +game[0].slice(5),
    game[1]
      .split('; ')
      .map((set) => set.split(', '))
      .map((setArray) => setArray.map((cubes) => cubes.split(' ')))
      .map((setArray) =>
        setArray.reduce((obj, cubesArray) => {
          obj[cubesArray[1]] = cubesArray[0];
          return obj;
        }, {})
      ),
  ]);

const sumIdPossibleGames = gamesArray.reduce((sum, [id, games]) => {
  for (const game of games) {
    if (game.red > 12 || game.green > 13 || game.blue > 14) return sum;
  }
  return sum + id;
}, 0);

console.log(sumIdPossibleGames);

// Part 2
const sumPowers = gamesArray.reduce((sum, [_, games]) => {
  const colors = ['red', 'green', 'blue'];
  const minimumCubes = { red: 0, green: 0, blue: 0 };
  games.forEach((game) =>
    colors.forEach((color) => {
      if (+game[color] > minimumCubes[color]) {
        minimumCubes[color] = +game[color];
      }
    })
  );
  const power = Object.values(minimumCubes).reduce(
    (product, amount) => product * amount
  );
  return sum + power;
}, 0);

console.log(sumPowers);
