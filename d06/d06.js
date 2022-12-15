// Start timer
let t0 = new Date();
console.log(`
======================
        Day 6
======================`)

const fs = require('fs');
const path = require('path');
let filename = 'input.txt';


let getFirstUniqueSet = function(str,len) {
    for (let i = len-1 ; i < str.length ; i++) {
        let s = new Set(str.slice(i-len+1, i+1).split(""));
        if (s.size == len) {
            return i + 1;
        }
    }
    return 0;
}

let getStartOfPacketMarker = function(str) {
    return getFirstUniqueSet(str, 4);
}

let getMessage = function(str) {
    return getFirstUniqueSet(str, 14);
}

// Array of each row of the input
let buffer = fs
.readFileSync(path.join(__dirname, filename), 'utf8') 
.toString()                                           
.trim();



// Part 1
let p1 = getStartOfPacketMarker(buffer);



// Part 2
let p2 = getMessage(buffer);


// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();
console.log(`Solution to part 1: ${p1}`);
console.log(`Solution to part 2: ${p2}`);
console.log(`Solution time: ${t} ms`);

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};



