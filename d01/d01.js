// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

let readTotalCals = function (pack) {

    let totalCals = pack
        .split('\n')
        .map((snack) => parseInt(snack))
        .reduce((a,b) => a+b,0);

    return totalCals;
}



let calories = fs
	.readFileSync(path.join(__dirname, filename), 'utf8')   // Read file
	.toString()                                             // Make sure it's a string
	.trim()                                                 // Remove whitespace
	.split('\n\n')                                          // Split into packages
	.map((pack) => readTotalCals(pack))                     // Read total calories of each pack
    .sort(function(a, b){return b - a});                    // Sort it (overkill)

// Part 1 solution
let p1 = calories[0];

// Part 2 solution
let p2 = calories
    .slice(0,3)              //Grab first three elements
    .reduce((a,b) => a+b,0);    // Sum them

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};



