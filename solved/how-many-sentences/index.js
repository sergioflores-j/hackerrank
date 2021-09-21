'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'countSentences' function below.
 *
 * The function is expected to return a LONG_INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY wordSet
 *  2. STRING_ARRAY sentences
 */

function isAnagram(wordCharset, word) {
  const internalWordCharset = [...wordCharset];
  const charset = word.split('');

  // Same charset length, can be an anagram
  if (charset.length === wordCharset.length) {
    // ? Check if matches the chars with the original word
    const matchingChars = charset.filter(c => {
      const matchingIndex = internalWordCharset.indexOf(c);
      
      if (matchingIndex !== -1) {
        // Make sure that doesn't repeat a char
        internalWordCharset.splice(matchingIndex, 1);

        return true;
      }
    });

    if (
      // Same char quantity = anagram or the same word
      matchingChars.length === charset.length
    ) {
      console.log('matchingChars', matchingChars);
      console.log('charset', charset);

      return true;
    }
  }
}

function factorial(num) {
  if (num <= 1) return 1;

  return num * factorial(num - 1);
}

function countAnagrams(sentence, wordSet) {
  console.log('-----------');
  console.log(sentence);

  const wordsInSentence = sentence.split(' ');
  
  let quantity = 0;
  const anagramsPerWord = {};

  for (const word of wordsInSentence) {
    const wordCharset = word.split('');

    console.log();
    console.log('wordCharset', wordCharset);
    
    const anagrams = wordSet.filter(i => i !== word && isAnagram(wordCharset, i));

    console.log('anagrams', anagrams);
    console.log();

    quantity += anagrams.length;
    
    if (!anagramsPerWord[word] && anagrams.length) {
      anagramsPerWord[word] = anagrams.length;
    } else if (anagrams.length) {
      anagramsPerWord[word] += anagrams.length;
    }
  }

  console.log('quantity', quantity);
  console.log('anagramsPerword', Object.keys(anagramsPerWord).length);
  const wordsWithAnagrams = Object.keys(anagramsPerWord).length;

  return quantity + factorial(quantity);
}

function countSentences(wordSet, sentences) {
  const formedSentences = [];

  for (let i = 0; i < sentences.length; ++i) {
    formedSentences[i] = countAnagrams(sentences[i], wordSet);
  }
  
  return formedSentences;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const wordSetCount = parseInt(readLine().trim(), 10);

    let wordSet = [];

    for (let i = 0; i < wordSetCount; i++) {
        const wordSetItem = readLine();
        wordSet.push(wordSetItem);
    }

    const sentencesCount = parseInt(readLine().trim(), 10);

    let sentences = [];

    for (let i = 0; i < sentencesCount; i++) {
        const sentencesItem = readLine();
        sentences.push(sentencesItem);
    }

    const result = countSentences(wordSet, sentences);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
