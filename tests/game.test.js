const { findLetterIndices } = require('../assets/game-utils');

test('findLetterIndices matches letters case-insensitively', () => {
  expect(findLetterIndices('Hello', 'h')).toEqual([0]);
  expect(findLetterIndices('Hello', 'H')).toEqual([0]);
});

test('findLetterIndices finds all repeated letters', () => {
  expect(findLetterIndices('Mississippi', 's')).toEqual([2,3,5,6]);
  expect(findLetterIndices('apple', 'p')).toEqual([1,2]);
});
