import { readFileSync } from "fs";
import { log } from "console";
import { multiply } from "../utils.mjs";

const input = readFileSync("./day6/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

const [durations, records] = input.map((line) =>
  line.match(/\d+/g).map(Number)
);

// Your toy boat has a starting speed of zero millimeters per millisecond.
// For each whole millisecond you spend at the beginning of the race holding down the button,
// the boat's speed increases by one millimeter per millisecond.
const START_SPEED = 0;
const SPEED_INCREASE = 1;

let results = [];

durations.forEach((time, index) => {
  log("Time limit", time);
  for (let holdDuration = 1; holdDuration < time; holdDuration++) {
    // log("Holding button time:", holdDuration);
    const remaining = time - holdDuration;

    const travelSpeed = holdDuration * SPEED_INCREASE;
    const travel = remaining * travelSpeed;

    if (travel > records[index]) {
      //   log("travel speed", travelSpeed);
      //   log("travel distance", travel);
      results[index] = (results[index] || 0) + 1;
      log(holdDuration);
    }
  }
});

log(multiply(results));
