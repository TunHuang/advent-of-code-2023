const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const testinput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const inputTable = Object.fromEntries(
  testinput
    .split('\n\n')
    .map((section, index) =>
      index === 0 ? section.split(': ') : section.split(':\n')
    )
    .map((section, index) =>
      index === 0
        ? [section[0], section[1].split(' ').map((numStr) => +numStr)]
        : [
            section[0],
            section[1]
              .split('\n')
              .map((map) => map.split(' ').map((numStr) => +numStr)),
          ]
    )
);

const {
  seeds,
  'seed-to-soil map': seedToSoil,
  'soil-to-fertilizer map': soilToFertilizer,
  'fertilizer-to-water map': fertilizerToWater,
  'water-to-light map': waterToLight,
  'light-to-temperature map': lightToTemperatur,
  'temperature-to-humidity map': temperatureToHumidity,
  'humidity-to-location map': humidityToLocation,
} = inputTable;

const getDestination = (source, map) => {
  for (const [destStart, sourceStart, range] of map) {
    const diff = source - sourceStart;
    if (diff >= 0 && diff < range) {
      return destStart + diff;
    }
  }
  return source;
};

// const locationList = seeds.map((seed) =>
//   [
//     seedToSoil,
//     soilToFertilizer,
//     fertilizerToWater,
//     waterToLight,
//     lightToTemperatur,
//     temperatureToHumidity,
//     humidityToLocation,
//   ].reduce((accu, curr) => getDestination(accu, curr), seed)
// );

// const lowestLocation = Math.min(...locationList);

// console.log(lowestLocation);

// Part 2
const seedRanges = seeds.reduce(
  (accu, curr, i) =>
    i % 2 === 0
      ? [...accu, [curr]]
      : [...accu.slice(0, -1), [...accu.at(-1), curr]],
  []
);
console.log(seedRanges);
// Idee ist, die ranges zu mergen. Aber da der Code selbst für einen einzigen Range schon zu langsam ist, würde es nicht reichen.

// const sortedSeedRanges = seedRanges.sort(([start1], [start2]) => start1 - start2);
// console.log(sortedSeedRanges);

// for (let i = 0; i < seedRanges.length - 1; i++) {
//   if (seedRanges[i][0] + seedRanges[i][1] >= seedRanges[i+1][0]) {
//     const mergedRange = seedRanges[i];
//     if (seedRanges[i][0] + seedRanges[i][1] < seedRanges[i+1][0] + seedRanges[i+1][1]) {
//       mergedRange[1] = 
//     }
//   }
// }

// const mergedRange = seedRanges.reduce((accuRange, currRange) => {
//   if (currRange[0] - accuRange[0] >= accuRange[1] || currRange[0] + currRange[1] <= accuRange[0]) {
//     return accuRange;
//   }
//   const newRange = accuRange;
//   if (currRange[0] < accuRange[0]) {
//     newRange[0] = currRange[0];
//   }
//   if (currRange[0] + currRange[1] > accuRange[0] + accuRange[1]) {
//     newRange[1] = accuRange[0] + (currRange[0] + currRange[1] - (accuRange[0] + accuRange[1]));
//   }
//   return newRange;
// });
// console.log(mergedRange);
/* 
const getLowestLocationFromRange = ([start, length]) => {
  let lowest = Infinity;
  for (let i = 0; i < length; i++) {
    // console.log({start});
    const location = [
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperatur,
      temperatureToHumidity,
      humidityToLocation,
    ].reduce((accu, curr) => getDestination(accu, curr), start + i);
    // const location =
    // getDestination(
    //   getDestination(
    //     getDestination(
    //       getDestination(
    //         getDestination(
    //           getDestination(
    //             getDestination(
    //               start + i, seedToSoil
    //             ), soilToFertilizer
    //           ), fertilizerToWater
    //         ), waterToLight
    //       ), lightToTemperatur
    //     ), temperatureToHumidity
    //   ), humidityToLocation
    // );
    if (location < lowest) {
      lowest = location;
    }
  }
  return lowest;
};
const result = getLowestLocationFromRange(seedRanges[0]);
console.log(result);

// const lowestLocation2 = seedRanges.reduce((lowest, currRange) => {
//   const result = getLowestLocationFromRange(currRange);
//   return result < lowest ? result : lowest;
// }, Infinity);
// console.log(lowestLocation2);
 */