const inputTable = {
  time: [49, 97, 94, 94],
  distance: [263, 1532, 1378, 1851]
};

const calcDistance = (charging, total) => (total - charging) * charging;

const calcMinCharge = (time, distance) => {
  for (let i = 1; i < time; i++) {
    if (calcDistance(i, time) > distance) return i;
  }
};

const calcWays = (min, total) => total - min * 2 + 1;

let product = 1;
for (let i = 0; i < inputTable.time.length; i++) {
  const min = calcMinCharge(inputTable.time[i], inputTable.distance[i]);
  const ways = calcWays(min, inputTable.time[i]);
  product *= ways;
}
console.log({product});

// Part 2
const time = 49979494;
const distance = 263153213781851;
const min = calcMinCharge(time, distance);
const ways = calcWays(min, time);
console.log(ways);