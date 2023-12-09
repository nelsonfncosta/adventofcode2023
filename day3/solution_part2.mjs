import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./day3/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

// const input = readFileSync("./day3/test.txt", {
//   encoding: "utf8",
//   flag: "r",
// }).split("\r\n");

const regex = /\*/g;

const digitsRegex = /\d+/g;

let symbolPositions = [];
let numbersPositions = [];

input.forEach((line, index) => {
  const found = line.matchAll(regex);
  const foundDigits = line.matchAll(digitsRegex);

  const digitMatches = [...foundDigits];
  const matches = [...found];

  numbersPositions.push({});
  digitMatches.forEach((dm) => {
    numbersPositions[index][dm.index] = dm[0];
  });

  symbolPositions.push([]);
  matches.forEach((match) => {
    symbolPositions[index].push(match.index);
    // console.log(`Symbol found at x: ${index} y: ${match.index}`);
  });
});

// console.log("symbols", symbolPositions);
// console.log("numbers", numbersPositions);

function between(x, min, max) {
  return x >= min && x <= max;
}

function multiply(arr) {
  return arr.reduce((a, b) => a * b, 1);
}

const getGearRatio = (x, y) => {
  const around = [-1, 0, 1];
  const parts = [];

  around.forEach((n) => {
    const numbs = numbersPositions[x + n];

    Object.entries(numbs).forEach(([numStart, numValue]) => {
      numStart = Number(numStart);
      const numEnd = numStart + numValue.length - 1;

      if (between(y, numStart - 1, numEnd + 1)) {
        parts.push(Number(numValue));
      }
    });
  });

  return parts.length === 2 ? multiply(parts) : 0;
};

let result = 0;

symbolPositions.forEach((pos, xx) => {
  pos.forEach((yy) => {
    // log("symbot * at ", xx, yy);
    result = result + getGearRatio(xx, yy);
  });
});

console.log(result);
