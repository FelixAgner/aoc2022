// Start timer
let t0 = new Date();
console.log(`
======================
        Day 3
======================`)
const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

// Convert a character to priority value
let priority = function(c){
    asciiValue = c.charCodeAt(0);
    return asciiValue > 90 ? asciiValue - 96 : asciiValue - 38;
}

// Find doubles in each rucksack (part 1)
let findDoubles = function(rucksack){
    left = rucksack.slice(0,rucksack.length/2)
    right = rucksack.slice(rucksack.length/2,rucksack.length)
    for (let item of left){
        if (right.find( (i) => i == item) != undefined){
            return item
        }
    }

    return 0
}

let findBadge = function(rucksacks){
    let multiples = new Array(53).fill(0);
    for (let rucksack of rucksacks){
        for (let item of new Set(rucksack)){
            multiples[item]++;
        }
    }
    return multiples.findIndex( (i) => i == 3);
}

let findBadgeValues = function(rucksacks){
    let tot = 0;
    for (let i = 0 ; i < rucksacks.length ; i+=3){
        tot += findBadge(rucksacks.slice(i,i+3));
    }
    return tot;
}


// Array of each row of the input
let rucksacks = fs
	.readFileSync(path.join(__dirname, filename), 'utf8') 
	.toString()                                           
	.trim()                                              
	.split('\n')
    .map( (str) => str.split("").map( (arr) => priority(arr) ));


// Part 1
let p1 = rucksacks
    .map( (rucksack) => findDoubles(rucksack))
    .reduce( (a,b) => a+b, 0);    

// Part 2
let p2 = findBadgeValues(rucksacks);                                         

console.log(p1)
console.log(p2)

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};



