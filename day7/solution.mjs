import { readFileSync } from "fs";
import { log } from "console";

const input = readFileSync("./day7/input", {
  encoding: "utf8",
  flag: "r",
}).split("\r\n");

const STRENGTH_MAP = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const hands = input.map((i) => {
  const [hand, bid] = i.split(" ");
  return [hand, Number(bid)];
});

const is5Of = (hand) => hand.split("").every((char) => char === str[0]);

const countChars = (str) => {
  const cnt = {};

  str.split("").forEach((char) => {
    cnt[char] = (cnt[char] || 0) + 1;
  });

  return cnt;
};

log(hands);

hands.forEach(([hand, bid], index) => {
  const cnt = countChars(hand);
  const typeScore = Number(
    Object.values(cnt)
      .sort((a, b) => b - a)
      .join("")
      .padEnd(5, "0")
  );

  hands[index].push(typeScore);
});

// negative if a is less than b,
//  positive if a is greater than b,
//   and zero if they are equal.
const checkHighCard = (a, b) => {
  for (let index = 0; index < a.length; index++) {
    const aChar = a.at(index);
    const bChar = b.at(index);

    if (aChar !== bChar) {
      return STRENGTH_MAP[aChar] - STRENGTH_MAP[bChar];
    }
  }

  return 0;
};

const sorted = hands.sort((a, b) => {
  const [hand_A, bid_A, typeScore_A] = a;
  const [hand_B, bid_B, typeScore_B] = b;

  if (typeScore_A < typeScore_B) {
    return -1;
  } else if (typeScore_A > typeScore_B) {
    return 1;
  }

  log("check", hand_A, hand_B);
  return checkHighCard(hand_A, hand_B);
});

// log(sorted);

const result = sorted.map(([_, bid], index) => bid * (index + 1));

log(result.reduce((acc, cur) => acc + cur, 0));
