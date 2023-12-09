import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./day4/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

let result = 0;

const matchCount = (winning, bets) =>
  bets.filter((value) => winning.includes(value)).length;

function add(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

const instances = [];

input.forEach((line, index) => {
  // original instance +1
  instances[index] = (instances[index] || 0) + 1;

  const [cardString, numbers] = line.split(": ");
  const [winningString, betString] = numbers.split(" | ");

  const winning = winningString.match(/\d+/g).map(Number);
  const bets = betString.match(/\d+/g).map(Number);

  const matches = matchCount(winning, bets);

  for (let j = 1; j <= instances[index]; j++) {
    for (let i = 1; i <= matches; i++) {
      const card = index + i;
      instances[card] = (instances[card] || 0) + 1;
    }
  }
});

result = add(instances);

log("Puzzle answer is ->", result);
