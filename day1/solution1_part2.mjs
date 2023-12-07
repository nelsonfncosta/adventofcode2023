import { readFileSync } from "fs";

const input = readFileSync("./day1/input1.txt", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");
// const input = readFileSync("./ex-part1.txt", { encoding: 'utf8', flag: 'r' }).split('\r\n');

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const keys = Object.keys(numbers);

const myRegex = new RegExp("(?=(" + keys.join("|") + "))", "g");
console.log("regex", myRegex);

const getCalibration = (line) => {
  const found = line.matchAll(myRegex);
  const groups = [...found];

  const firstG = groups[0];
  const lastG = groups[groups.length - 1];

  const first = firstG[1];
  const last = lastG[1];

  return parseInt(`${numbers[first]}${numbers[last]}`);
};

// console.log(getCalibration("foursixtwoninevtzzgntnlg6oneightbxp"))

let result = 0;

input.forEach((line) => {
  const value = getCalibration(line);
  result = result + value;
});

console.log(result, typeof result);
