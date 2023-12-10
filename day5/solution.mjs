import { log } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./day5/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

function between(x, min, max) {
  return x >= min && x <= max;
}

const [seedsInput, _, ...data] = input;

const seeds = seedsInput.match(/\d+/g).map(Number);
log(seeds);

const almanacMap = {};
let lastKey = undefined;

for (let index = 0; index < data.length; index++) {
  const element = data[index];

  if (!element) {
    lastKey = undefined;
  } else {
    if (lastKey) {
      almanacMap[lastKey].push(element);
    } else {
      lastKey = element;
      almanacMap[lastKey] = [];
    }
  }
}

log(almanacMap);

const findSeedDestination = (seed, destinations, sources) => {
  const [sx, sy] = sources;
  const [dx, dy] = destinations;

  if (between(seed, sx, sy)) {
    const seedDestion = seed - sx + dx;

    return seedDestion;
  }
};

const lookUp = (value, map) => {
  const [destination, source, rangeLenght] = map.split(" ").map(Number);
  const sourceRange = [source, source + rangeLenght - 1];
  const destinationRange = [destination, destination + rangeLenght - 1];

  log("Source range:", sourceRange, "destination range:", destinationRange);

  return findSeedDestination(value, destinationRange, sourceRange);
};

const seedMaps = [];

seeds.forEach((seed, index) => {
  let valueToLookup = seed;
  seedMaps[index] = [seed];

  Object.entries(almanacMap).forEach(([label, maps]) => {
    log(label);

    let match;

    maps.some((map) => {
      const res = lookUp(valueToLookup, map);

      if (res) {
        match = res;
        return true;
      }
    });

    valueToLookup = match || valueToLookup;
    // log("match found", match || valueToLookup);
    seedMaps[index].push(valueToLookup);
  });
});

let result = 0;

// log(seedMaps);
const locations = seedMaps.map((sm) => sm[sm.length - 1]);

result = Math.min(...locations);

log("Puzzle answer is ->", result);
