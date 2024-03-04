// transform text to ascii array
const textResolver = (text) => {
    let binaryArray = text.split('').map(char => char.charCodeAt(0));
    let newBinaryArray = [];
    for (let i = 0; i < binaryArray.length; i++) {
        byteResolver(binaryArray[i], byte => newBinaryArray.push(byte));
    }

    return newBinaryArray.join(' ');
}

// imported from @numberToByte.js
const byteResolver = (expectedNumber, listener) => {
    let size = 0;
    let bytes = [];

    const EventEmitter = require('events');
    const listenerEmitter = new EventEmitter();
    listenerEmitter.on('result', listener);

    const processResolver = () => {
        let byteArray = [];

        for (let byteIndex = 7; byteIndex >= 0; byteIndex--) {
            const byteIndexSize = Math.pow(2, byteIndex);

            if (size < expectedNumber && size + byteIndexSize <= expectedNumber) {
                size += byteIndexSize;
                byteArray.push(1);
            } else {
                byteArray.push(0);
            }
        }

        bytes.push(byteArray.join(''));

        if (size < expectedNumber) {
            processResolver();
        } else {
            listenerEmitter.emit('result', bytes.join(' '));
        }
    }

    processResolver();
}

// do stuff...
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

function test() {
    readline.question(`Enter your text: `, text => {
        console.log(textResolver(text));
        test();
    });
}

test();