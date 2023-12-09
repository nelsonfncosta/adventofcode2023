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

const regex = /[^a-zA-Z0-9.]/g;

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

const hasSymbolAround = (line, start, end) => {
  const around = [-1, 0, 1];

  return around.some((n) => {
    const symb = symbolPositions[line + n];

    if (!!symb && symb.length > 0) {
      if (symb.some((symbolPos) => between(symbolPos, start - 1, end))) {
        return true;
      }
    }
    return false;
  });
};

let result = 0;

numbersPositions.forEach((parts, line) => {
  Object.entries(parts).forEach(([index, value]) => {
    // log("range", value, index, Number(index) + Number(value.length));

    if (hasSymbolAround(line, index, Number(index) + Number(value.length))) {
      const val = Number(value);

      //   console.log("line ", line + 1, val);

      result = result + val;
    }
  });
});

console.log(result);
