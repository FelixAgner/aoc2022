// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

let makePair = function(str) {
    return str
        .split(/[-,]/)
        .map( (i) => parseInt(i));
}

let fullyOverlaps = function(pair) {
    return (pair[0]-pair[2])*(pair[1]-pair[3]) <= 0;
}

let isOverlapping = function(pair) {
    return !( pair[1] < pair[2] || pair[0] > pair[3]);
}

// Array of each row of the input
let pairs = fs
	.readFileSync(path.join(__dirname, filename), 'utf8') 
	.toString()                                           
	.trim()                                              
	.split('\n')
    .map( (str) => makePair(str));

// Part 1
let p1 = pairs
    .map( (pair) => fullyOverlaps(pair))
    .reduce( (a,b) => a+b, 0);    

// Part 2
let p2 = pairs
    .map( (pair) => isOverlapping(pair))
    .reduce( (a,b) => a+b, 0);    


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



