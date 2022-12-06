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

// Start timer
let t0 = new Date();

// Array of each row of the input
let buffer = fs
.readFileSync(path.join(__dirname, filename), 'utf8') 
.toString()                                           
.trim();



// Part 1
let p1 = getStartOfPacketMarker(buffer);



// Part 2
let p2 = getMessage(buffer);


console.log(p1);
console.log(p2);

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};



