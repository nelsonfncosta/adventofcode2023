/**
 * Searches the array for an item.
 * @param {Array} arr
 * @param {Any} item - The item to search for.
 * @param {(any) => number} compareFn - Function used to compare items.
 *    Expected to return:
 *      - Less than zero if search value is less than current item
 *      - Greater than zero if search value is greater than item
 *      - Zero if search value is equal to item.
 * @returns {number} The index of the item (if found), otherwise (-(insertion point) -1)
 */
export const binarySearch = (arr, item, compareFn) => {
  let l = 0;
  let u = arr.length - 1;
  while (l <= u) {
    const m = (l + u) >> 1;
    const comp = compareFn(item, arr[m]);
    if (comp < 0) {
      u = m - 1;
    } else if (comp > 0) {
      l = m + 1;
    } else {
      return m;
    }
  }
  return ~l;
};

/**
 * Splits the string on the delimiter and invokes the map function for each delimited substring.
 * @param {string} str
 * @param {string|Regexp} delimiter
 * @param {(string) => any} mapFn
 * @returns {array}
 */
export const parseDelimited = (str, delimiter, mapFn = (x) => x) =>
  str.split(delimiter).map(mapFn);

/**
 * Creates an array of elements split into pairs. If the array cannot be split evenly the final pair will have one element
 * @param {Array}
 * @returns {Array}
 */
export const pairs = (array) =>
  array.reduce(
    (acc, _, i) => (i % 2 === 0 ? [...acc, array.slice(i, i + 2)] : acc),
    []
  );

export default { binarySearch, parseDelimited, pairs };
