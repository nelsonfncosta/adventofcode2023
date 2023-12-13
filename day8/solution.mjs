import { readFileSync } from "fs";
import { log } from "console";

const fileName = "./day8/example";
// const fileName = "./day8/test";

const input = readFileSync(fileName, {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

log(input);

const [instructions, _, ...nodes] = input;

const node = (id, left, right) => ({ id, left, right });

const map = {};

nodes.forEach((line) => {
  const [id, left, right] = line.match(/\w+/g);

  map[id] = node(id, left, right);
});

const DIRECTIONS = { L: "left", R: "right" };

// 1. Initialize all vertices as NOT_VISITED.
// 2. For each vertex, if it is NOT_VISITED, call the recursive function processDFSTree.
// 3. In the processDFSTree function:
//   - Mark the current node as IN_STACK.
//   - For each adjacent node, if it is NOT_VISITED, call processDFSTree.
//   - If it is IN_STACK, then a cycle is found.
//   - Mark the current node as DONE.

const findCycles = () => {};

let current = "AAA";
let steps = 0;

for (let index = 0; index < instructions.length; index++) {
  steps++;

  const dir = DIRECTIONS[instructions.at(index)];
  const next = map[current][dir];

  //   log("current", current);
  //   log("dir", dir);
  //   log("next", next);
  if (current === "ZZZ") {
    break;
  }

  current = next;

  if (index + 1 === instructions.length) {
    index = 1;
  }
}

log(map, steps);
