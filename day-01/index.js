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
    
    const findFirstDigit_2 = string => {
      if (!isNaN(string[0])) return string[0];
      if (string.startsWith('one')) return '1';
      if (string.startsWith('two')) return '2';
      if (string.startsWith('three')) return '3';
      if (string.startsWith('four')) return '4';
      if (string.startsWith('five')) return '5';
      if (string.startsWith('six')) return '6';
      if (string.startsWith('seven')) return '7';
      if (string.startsWith('eight')) return '8';
      if (string.startsWith('nine')) return '9';
      return findFirstDigit_2(string.slice(1));
    };
    
    const findLastDigit_2 = string => {
      if (!isNaN(string.at(-1))) return string.at(-1);
      if (string.endsWith('one')) return '1';
      if (string.endsWith('two')) return '2';
      if (string.endsWith('three')) return '3';
      if (string.endsWith('four')) return '4';
      if (string.endsWith('five')) return '5';
      if (string.endsWith('six')) return '6';
      if (string.endsWith('seven')) return '7';
      if (string.endsWith('eight')) return '8';
      if (string.endsWith('nine')) return '9';
      return findLastDigit_2(string.slice(0, -1));
    };
    
    const calibrationSum_2 = inputArray
      .map(string => Number(findFirstDigit_2(string) + findLastDigit_2(string)))
      .reduce((sum, value) => sum + value);
    
    console.log(calibrationSum_2);