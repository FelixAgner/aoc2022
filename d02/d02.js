// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

// Map from letter to integer
let actionToInt = {
    'A': 0,
    'B': 1,
    'C': 2,
    'X': 0,
    'Y': 1,
    'Z': 2,
}

// Part 1 - get score from their move + your move
let calculateScore = function (round) {

    let [them, you] = round
        .trim()
        .split(' ')
        .map((action) => actionToInt[action]);
    
    let gameResult = ( (you-them + 4) % 3)
    return 1+you + 3*gameResult;
}

// Part 2 - get score from their move + result
let calculateRealScore = function (round) {
    let [them, result] = round
    .trim()
    .split(' ')
    .map((action) => actionToInt[action]);

    let you = (them + 2 + result) % 3;
    return 3*result + you+1;
}

// Array of each row of the input
let roundInstructions = fs
	.readFileSync(path.join(__dirname, filename), 'utf8') 
	.toString()                                           
	.trim()                                              
	.split('\n');                                         
	    

// Part 1 solution
let p1 = roundInstructions
    .map((round) => calculateScore(round))
    .reduce((a,b) => a+b, 0);
console.log(p1)

// Part 2 solution
let p2 = roundInstructions
    .map((round) => calculateRealScore(round))
    .reduce((a,b) => a+b, 0);
console.log(p2)

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};



