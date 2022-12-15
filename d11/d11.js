// Start timer
let t0 = new Date();
console.log(`
======================
        Day 11
======================`)

const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

let makeOperation = function(inp) {
    let args = inp.split(" ");
    if (args[1] == "+") {
        if (args[0] == "old" && args[2] == "old") {
            return (x) => x+x;
        } else if (args[0] == "old") {
            return (x) => x+parseInt(args[2]);
        } else if (args[2] == "old") {
            return (x) => x+parseInt(args[0]);
        } else {
            return (x) => parseInt(args[2])+parseInt(args[0]);
        }
    } else {
        if (args[0] == "old" && args[2] == "old") {
            return (x) => x*x;
        } else if (args[0] == "old") {
            return (x) => x*parseInt(args[2]);
        } else if (args[2] == "old") {
            return (x) => x*parseInt(args[0]);
        } else {
            return (x) => parseInt(args[2])*parseInt(args[0]);
        }
    }
}

let parseMonkey = function(inp) {
    let items = inp[1]
        .split(": ")[1]
        .split(" ")
        .map( (item) => parseInt(item));
    let operation = makeOperation(inp[2].split("= ")[1]);
    let test = parseInt(inp[3].split("divisible by ")[1]);
    let trueMonkey =  parseInt(inp[4].split("monkey ")[1]);
    let falseMonkey =  parseInt(inp[5].split("monkey ")[1]);

    return [
        items,
        operation,
        test,
        trueMonkey,
        falseMonkey,
    ]
}

let initiateMonkeys = function(startingMonkeys) {
    let itemLists = [];
    let operations = [];
    let tests = [];
    let trueMonkeys = [];
    let falseMonkeys = [];

    for (monkey of startingMonkeys) {
        let [items, 
            operation, 
            test, 
            trueMonkey, 
            falseMonkey] = parseMonkey(monkey);

        itemLists.push(items);
        tests.push(test);
        operations.push(operation);
        trueMonkeys.push(trueMonkey);
        falseMonkeys.push(falseMonkey);
    }

    return [itemLists, operations, tests, trueMonkeys, falseMonkeys];
}

// Read input
let startingMonkeys = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n\n').map(
        (line) => line.split("\n")
    );
nMonkeys = startingMonkeys.length;


// Part 1
let [itemLists, operations, tests, trueMonkeys, falseMonkeys] = initiateMonkeys(startingMonkeys);
let fiddleingCount = new Array(nMonkeys).fill(0);
for (let round = 0 ; round < 20 ; round++) {
    for (let monkey = 0 ; monkey < nMonkeys ; monkey ++) {
        while ( itemLists[monkey].length > 0 ) {
            fiddleingCount[monkey]++;
            let worryLevel = itemLists[monkey].pop();
            worryLevel = operations[monkey](worryLevel);
            worryLevel = Math.floor(worryLevel/3);
            if (worryLevel % tests[monkey] == 0) {
                itemLists[trueMonkeys[monkey]].push(worryLevel);
            } else {
                itemLists[falseMonkeys[monkey]].push(worryLevel);
            }
        }
    } 
}
fiddleingCount.sort(function(a, b){return b - a});

let p1 = fiddleingCount[0]*fiddleingCount[1];
console.log(`Solution to part 1: ${p1}`);


//Part 2
[itemLists, operations, tests, trueMonkeys, falseMonkeys] = initiateMonkeys(startingMonkeys);
let scd = tests.reduce((x, y) => x*y, 1);
fiddleingCount = new Array(nMonkeys).fill(0);
for (let round = 0 ; round < 10000 ; round++) {
    for (let monkey = 0 ; monkey < nMonkeys ; monkey ++) {
        while ( itemLists[monkey].length > 0 ) {
            fiddleingCount[monkey]++;
            let worryLevel = itemLists[monkey].pop();
            worryLevel = operations[monkey](worryLevel);
            worryLevel = worryLevel % scd;
            if (worryLevel % tests[monkey] == 0) {
                itemLists[trueMonkeys[monkey]].push(worryLevel);
            } else {
                itemLists[falseMonkeys[monkey]].push(worryLevel);
            }
        }
    } 
}
fiddleingCount.sort(function(a, b){return b - a});

let p2 = fiddleingCount[0]*fiddleingCount[1];
console.log(`Solution to part 2: \n${p2}`);


// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();
console.log(`Solution time: ${t} ms`);

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

