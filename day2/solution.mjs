import { readFileSync } from "fs";

const input = readFileSync("./day2/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

const config = {
  red: 12,
  green: 13,
  blue: 14,
};

let result = 0;

input.forEach((line) => {
  const [game, rest] = line.split(": ");
  const [_, id] = game.split(" ");

  const subsets = rest.split("; ");

  const isInvalid = subsets.some((set) => {
    const pulls = set.split(", ");

    const hasInvalid = pulls.some((pull) => {
      const [amount, color] = pull.split(" ");

      return parseInt(amount) > config[color];
    });

    return hasInvalid;
  });

  result = isInvalid ? result : result + parseInt(id);
});

console.log(result);

process.exit(1);
