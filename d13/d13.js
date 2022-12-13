const fs = require('fs');
const path = require('path');
const {WeirdNumber} = require('./weirdnumber');

let filename = 'input.txt';


// Start timer
let t0 = new Date();

// Read input
let pairs = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n\n').map(
        (line) => line.split("\n")
        .map( (str) => new WeirdNumber(str))
    );


// Part 1
let p1 = 0;
for (let i = 0 ; i < pairs.length ; i++) {
    let comparison = pairs[i][0].compare(pairs[i][1]);
    p1 += Math.max((i+1)*comparison,0);
}
console.log(`Solution to part 1: ${p1}`);


//Part 2
let allPairs = pairs.flat();
allPairs.push(new WeirdNumber("[[2]]"));
allPairs.push(new WeirdNumber("[[6]]"));
allPairs.sort( (a,b) => b.compare(a));

let i = 0;
let j = 0;
let s = 0;
while (i==0 || j ==0 ){
    s++;
    if (allPairs[s].toString() == "[[2]]") {i = s+1;}
    if (allPairs[s].toString() == "[[6]]") {j = s+1;}
}

let p2 = i*j;
console.log(`Solution to part 2: ${p2}`);


// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();
console.log(`Solution time: ${t} ms`);

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

