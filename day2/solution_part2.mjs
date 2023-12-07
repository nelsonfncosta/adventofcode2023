import { readFileSync } from "fs";

const input = readFileSync("./day2/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

const rgb = (r, g, b) => ({
  red: r || 0,
  green: g || 0,
  blue: b || 0,
});

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

  const minimum = rgb();

  subsets.forEach((set) => {
    const pulls = set.split(", ");

    pulls.forEach((pull) => {
      const [amount, color] = pull.split(" ");

      minimum[color] =
        amount > minimum[color] ? parseInt(amount) : minimum[color];
    });
  });

  const power = Object.values(minimum).reduce((a, b) => a * b, 1);

  result = result + power;
});

console.log(result);

process.exit(1);
