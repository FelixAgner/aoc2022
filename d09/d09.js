const { timeStamp } = require('console');
const fs = require('fs');
const path = require('path');
const {Knot} = require('./knot')

let filename = 'input.txt';


// Start timer
let t0 = new Date();


// Read input
let commands = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n');

//Part 1
let rope1 = new Knot(2);
for (command of commands){
    rope1.move(command);
}
p1 = rope1.getVisited();
console.log(p1);

//Part 2
let rope2 = new Knot(10);
for (command of commands){
    rope2.move(command);
}
p2 = rope2.getVisited();
console.log(p2);

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

