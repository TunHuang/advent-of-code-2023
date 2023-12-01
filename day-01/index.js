    const fs = require('fs');
    const input = fs.readFileSync('input.txt', 'utf8');
    const inputArray = input.split('\n');
    
    const findFirstDigit = (str) => {
      for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) return str[i];
      }
    };
    
    const findLastDigit = (str) => {
      for (let i = str.length - 1; i >= 0; i--) {
        if (!isNaN(str[i])) return str[i];
      }
    };
    
    const calibrationSum = inputArray
      .map(string => Number(findFirstDigit(string) + findLastDigit(string)))
      .reduce((sum, value) => sum + value);
    
    console.log(calibrationSum);
    
    // Part 2

    const letterDigitMapping = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9'
    };

    const findFirstDigit_2 = string => {
      if (!isNaN(string[0])) return string[0];
      for (const key in letterDigitMapping) {
        if (string.startsWith(key)) return letterDigitMapping[key];
      }
      return findFirstDigit_2(string.slice(1));
    };

    const findLastDigit_2 = string => {
      if (!isNaN(string.at(-1))) return string.at(-1);
      for (const key in letterDigitMapping) {
        if (string.endsWith(key)) return letterDigitMapping[key];
      }
      return findLastDigit_2(string.slice(0, -1));
    };
    
    const calibrationSum_2 = inputArray
      .map(string => Number(findFirstDigit_2(string) + findLastDigit_2(string)))
      .reduce((sum, value) => sum + value);
    
    console.log(calibrationSum_2);