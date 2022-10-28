const words = require("an-array-of-english-words");

/**
 * Breaks a string into chars.
 * @param {String} word A word to beak into chars.
 * @returns An object with the characters making up [word] as keys and their occurances as values.
 */
const countLetters = (word) => {
  const letters = word.split("");
  return letters.reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: acc[letter] ? acc[letter] + 1 : 1,
    }),
    {}
  );
};

/**
 *  Searches [allWords] for words which contain the same letters with as many or fewer occurances of each letter as in [words].
 * @param {String} word A string to base the search upon.
 * @param {String[]} allWords An array of strings to search.
 * @returns An array of strings containing only the letters in [word], with as many or fewer occurances of each letter.
 */
const findCountdownWords = (word, allWords) => {
  const baseWordLetters = countLetters(word.toLowerCase());
  const validLengthWords = allWords.filter((check) => {
    return check.length <= word.length;
  });
  const validWords = validLengthWords.filter((wordToCheck) => {
    const checkLetters = countLetters(wordToCheck);
    return Object.keys(checkLetters).every(
      (letter) =>
        baseWordLetters.hasOwnProperty(letter) &&
        baseWordLetters[letter] >= checkLetters[letter]
    );
  });
  return validWords;
};

// /**
//  *  Finds the longest word in an array
//  * @param {String[]} wordList An array of strings to search.
//  * @returns An object whose keys are a string (representing the longest word found) and a number (the length of said word).
//  */
// const findLongest = (wordList) => {
//   const longest = {};
//   longest.word = wordList.reduce((acc, word) => {
//     if (word.length > acc.length) return word;
//     return acc;
//   }, "");
//   longest.length = longest.word.length;
//   return longest;
// };

/**
 *  Finds the longest words in an array
 * @param {String[]} wordList An array of strings to search.
 * @returns An object whose keys are a string (representing the longest words found) and a number (the length of corresponding word).
 */
const findLongestWords = (wordList) => {
  const length = wordList.reduce((acc, word) => {
    if (word.length > acc) return word.length;
    return acc;
  }, 0);
  return findWords(wordList, length);
};

/**
 * Finds all words of a certain length within an array
 *
 * @param {String[]} wordList An array of strings
 * @param {Number|String} minLength Either a length to filter strings with, or 'max' to return the longest word. Defaults to 0, giving all words.
 * @returns An object whose keys represent words and whose value indicates the length of said word.
 */

const findWords = (wordList, minLength = 0) => {
  let words = {};
  if (minLength === "max") {
    words = findLongestWords(wordList);
  } else {
    for (let word of wordList) {
      if (word.length >= minLength) words[word] = word.length;
    }
  }
  return words;
};

/**
 * Creates a function whose exact operation is defined by the [length] arg.
 *
 * @param {Number|String} length Default = 0 which includes all words - Either a number representing length of words to search for, or "max" to search for longest word only.
 * @returns A function which takes a string as an argument and finds all possible words that can be made up of only the characters inside the given string, with the same number of
 * occurances.
 *
 * The amount of words returned and their lengths are specified by [length].
 */
const findWordsFactory =
  (minLength = 0) =>
  (word) =>
    sortObj(findWords(findCountdownWords(word, words), minLength));

const sortObj = (wordsList) => {
  let sortedObject = {};
  const sortedKeys = Object.keys(wordsList)
    .slice()
    .sort((a, b) => {
      if (a.length > b.length) return -1;
      else if (a.length < b.length) return 1;
      return 0;
    });
  for (let word of sortedKeys) {
    sortedObject[word] = word.length;
  }
  return sortedObject;
};

const conundrum = findWordsFactory(9);
const longest = findWordsFactory("max");
const findAllWords = findWordsFactory();
const sixLettersMin = findWordsFactory(6);

// console.log(longest("wsepilsub"));
// console.log(findAllWords("besgibexg"));
// console.log(sixLettersMin("besgibexg"));

module.exports.findLongestWords = longest;
module.exports.findAllWords = findAllWords;
