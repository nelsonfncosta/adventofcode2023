import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./day4/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

let result = 0;

input.forEach((line) => {
  const [card, numbers] = line.split(": ");
  const [winningString, betString] = numbers.split(" | ");

  const winning = winningString.match(/\d+/g).map(Number);
  const bets = betString.match(/\d+/g).map(Number);

  const matches = bets.filter((value) => winning.includes(value)).length;

  const score = matches > 0 ? Math.pow(2, matches - 1) : 0;

  result = result + score;
});

log("Puzzle answer is ->", result);
