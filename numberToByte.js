const EventEmitter = require('events');
// POSITION:  8    7   6   5  4  3  2  1
// VALUE:    128  64  32  16  8  4  2  1

const byteResolver = async (expectedNumber, listener) => {
    let size = 0;
    let bytes = [];
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
    await processResolver();
}

require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
}).question(`Enter your text: `, text => 
    byteResolver(parseInt(text), 
        result => console.log(result)
    )
);