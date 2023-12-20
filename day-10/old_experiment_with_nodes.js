const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const testInput = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const inputArray = input.split('\n');
const lineLength = inputArray[0].length;

const findStartingPosition = (matrix) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < lineLength; x++) {
      if (matrix[y][x] === 'S') return { y, x };
    }
  }
  throw new Error('No Starting Position found');
};
class LoopGraph {
  constructor(y, x) {
    this.start = new Node(y, x);
    this.findStartingType();
  }
  findStartingType() {
    const connectedToTop = ['|', '7', 'F'].includes(
      inputArray[this.start.y - 1]?.[this.start.x]
    );
    const connectedToRight = ['-', 'J', '7'].includes(
      inputArray[this.start.y][this.start.x + 1]
    );
    const connectedToBottom = ['|', 'L', 'J'].includes(
      inputArray[this.start.y + 1]?.[this.start.x]
    );
    const connectedToLeft = ['-', 'L', 'F'].includes(
      inputArray[this.start.y][this.start.x - 1]
    );
    if (connectedToTop && connectedToBottom) {
      this.start.type = '|';
    }
    if (connectedToLeft && connectedToRight) {
      this.start.type = '-';
    }
    if (connectedToTop && connectedToRight) {
      this.start.type = 'L';
    }
    if (connectedToTop && connectedToLeft) {
      this.start.type = 'J';
    }
    if (connectedToBottom && connectedToLeft) {
      this.start.type = '7';
    }
    if (connectedToBottom && connectedToRight) {
      this.start.type = 'F';
    }
  }
  toObject() {
    return this.start;
  }
  completeLoop(node = this.start) {
    console.log(node.y, node.x);
    switch (node.type) {
      case '|':
        if (!node.top) {
          const newType = inputArray[node.y - 1][node.x];
          if (newType === 'S') {
            node.top = this.start;
            this.start.bottom = node;
            return this.start;
          }
          node.top = new Node(node.y - 1, node.x, newType);
          node.top.bottom = node;
          return this.completeLoop(node.top);
        } else if (!node.bottom) {
          const newType = inputArray[node.y + 1][node.x];
          if (newType === 'S') {
            node.bottom = this.start;
            this.start.top = node;
            return this.start;
          }
          node.bottom = new Node(node.y + 1, node.x, newType);
          node.bottom.top = node;
          return this.completeLoop(node.bottom);
        }
      case '-':
        if (!node.left) {
          const newType = inputArray[node.y][node.x - 1];
          if (newType === 'S') {
            node.left = this.start;
            this.start.right = node;
            return this.start;
          }

          node.left = new Node(node.y, node.x - 1, newType);
          node.left.right = node;
          return this.completeLoop(node.left);
        } else if (!node.right) {
          const newType = inputArray[node.y][node.x + 1];
          if (newType === 'S') {
            node.right = this.start;
            this.start.left = node;
            return this.start;
          }

          node.right = new Node(node.y, node.x + 1, newType);
          node.right.left = node;
          return this.completeLoop(node.right);
        }
      case 'L':
        if (!node.top) {
          const newType = inputArray[node.y - 1][node.x];
          if (newType === 'S') {
            node.top = this.start;
            this.start.bottom = node;
            return this.start;
          }

          node.top = new Node(node.y - 1, node.x, newType);
          node.top.bottom = node;
          return this.completeLoop(node.top);
        } else if (!node.right) {
          const newType = inputArray[node.y][node.x + 1];
          if (newType === 'S') {
            node.right = this.start;
            this.start.left = node;
            return this.start;
          }

          node.right = new Node(node.y, node.x + 1, newType);
          node.right.left = node;
          return this.completeLoop(node.right);
        }
      case 'J':
        if (!node.top) {
          const newType = inputArray[node.y - 1][node.x];
          if (newType === 'S') {
            node.top = this.start;
            this.start.bottom = node;
            return this.start;
          }

          node.top = new Node(node.y - 1, node.x, newType);
          node.top.bottom = node;
          return this.completeLoop(node.top);
        } else if (!node.left) {
          const newType = inputArray[node.y][node.x - 1];
          if (newType === 'S') {
            node.left = this.start;
            this.start.right = node;
            return this.start;
          }

          node.left = new Node(node.y, node.x - 1, newType);
          node.left.right = node;
          return this.completeLoop(node.left);
        }
      case '7':
        if (!node.bottom) {
          const newType = inputArray[node.y + 1][node.x];
          if (newType === 'S') {
            node.bottom = this.start;
            this.start.top = node;
            return this.start;
          }

          node.bottom = new Node(node.y + 1, node.x, newType);
          node.bottom.top = node;
          return this.completeLoop(node.bottom);
        } else if (!node.left) {
          const newType = inputArray[node.y][node.x - 1];
          if (newType === 'S') {
            node.left = this.start;
            this.start.right = node;
            return this.start;
          }

          node.left = new Node(node.y, node.x - 1, newType);
          node.left.right = node;
          return this.completeLoop(node.left);
        }
      case 'F':
        if (!node.bottom) {
          const newType = inputArray[node.y + 1][node.x];
          if (newType === 'S') {
            node.bottom = this.start;
            this.start.top = node;
            return this.start;
          }

          node.bottom = new Node(node.y + 1, node.x, newType);
          node.bottom.top = node;
          return this.completeLoop(node.bottom);
        } else if (!node.right) {
          const newType = inputArray[node.y][node.x + 1];
          if (newType === 'S') {
            node.right = this.start;
            this.start.left = node;
            return this.start;
          }

          node.right = new Node(node.y, node.x + 1, newType);
          node.right.left = node;
          return this.completeLoop(node.right);
        }
      default:
        throw new Error('OMG');
    }
  }
}
class Node {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;
    this.distance = 0;
  }
  // addAdjacentNodes() {
  //   const newNodes = [];
  //   const connectedToLeft = ["-", "J", "7"];
  //   const connectedToRight = ["-", "L", "F"];
  //   const connectedToTop = ["|", "L", "J"];
  //   const connectedToBottom = ["|", "7", "F"];
  //   if (!this.top) {
  //     const type = inputArray[this.y - 1]?.[this.x];
  //     if (type && connectedToBottom.includes(type)) {
  //       this.top = new Node(this.y - 1, this.x, type);
  //       this.top.bottom = this;
  //       newNodes.push(this.top);
  //     }
  //   }
  //   if (!this.right) {
  //     const type = inputArray[this.y][this.x + 1];
  //     if (type && connectedToLeft.includes(type)) {
  //       this.right = new Node(this.y, this.x + 1, type);
  //       this.right.left = this;
  //       newNodes.push(this.right);
  //     }
  //   }
  //   if (!this.bottom) {
  //     const type = inputArray[this.y + 1]?.[this.x];
  //     if (type && connectedToTop.includes(type)) {
  //       this.bottom = new Node(this.y + 1, this.x, type);
  //       this.bottom.top = this;
  //       newNodes.push(this.bottom);
  //     }
  //   }
  //   if (!this.left) {
  //     const type = inputArray[this.y][this.x - 1];
  //     if (type && connectedToRight.includes(type)) {
  //       this.left = new Node(this.y, this.x - 1, type);
  //       this.left.right = this;
  //       newNodes.push(this.left);
  //     }
  //   }
  //   return newNodes;
  // }
}
const { y: startY, x: startX } = findStartingPosition(inputArray);
const loop = new LoopGraph(startY, startX);
console.log('new loop:', loop);
console.log('end:', loop.completeLoop());

// const [one, two] = loop.start.addAdjacentNodes();
// const newNodes = one.addAdjacentNodes();
// console.log("one:", one);
// console.log("newNodes:", newNodes);
// console.log("end:", loop.completeLoop());
