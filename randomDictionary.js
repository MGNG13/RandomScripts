/*
* Este script logra crear un conjunto de letras y numeros aleatorios.
* Todo esto es facilmente modificable!
*
* @author Magnus Norgaard
* @date 2022-07-08
*/

// Inputs
const LETTERS = Array.from('abcdefghijklmnopqrstuvwxyz');
const NUMBERS = Array.from('0123456789');

// Settings
const WORDS = 40;
const LENGTH_LINE = 10;
const PREVIEW_LOGS = false;

let ARRAY_DICTIONARY = '';

for (let i = 1; i <= WORDS; i++) {
    let randomFullWord = [];
    for (let unusedIndex = 0; unusedIndex < LENGTH_LINE; unusedIndex++) {
        let indexRandomLetter = Math.floor(Math.random() * LETTERS.length - 1);
        let indexRandomNumber = Math.floor(Math.random() * NUMBERS.length - 1);

        let randomLetter = LETTERS[indexRandomLetter];
        let randomNumber = NUMBERS[indexRandomNumber];

        randomFullWord.push(`${randomLetter !== undefined ? randomLetter : ''}${randomNumber !== undefined ? randomNumber : ''}`);
    }

    ARRAY_DICTIONARY += randomFullWord.join('');

    // example of index => 20 == 20
    if (i != WORDS) {
        ARRAY_DICTIONARY += '\n';
    }
}

// Logs
if (PREVIEW_LOGS) {
    console.log(ARRAY_DICTIONARY);
}

const path = require('path');
const fs = require('fs');

fs.writeFile(path.resolve(__dirname, './randomDictionary.txt'), ARRAY_DICTIONARY, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('\nSuccesfully!');
});
