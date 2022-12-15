// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');
let filename = 'input.txt';

let makeInitialStacks = function(str) {

    let stacks = [
        [], [], [], [], [], [], [], [], []
    ]
    let initial = str.split('\n');
    for (i = initial.length-2 ; i >= 0 ; i--) {
        for (j = 0 ; j < 9 ; j++) {
            let inp = initial[i].slice(j*4, j*4+3);
            if (inp != "   ") {
                stacks[j].push(inp);
            }
        }
    }
    return stacks
}

let parseCommand = function(str) {
    let [a, nbr, b, from, c, to] = str.split(' ');
    return {
        nbr: parseInt(nbr),
        from: parseInt(from)-1,
        to: parseInt(to)-1
    };
}

let makeInstructions = function(str) {
    let instructions = [];
    for (line of str.split('\n')) {
        instructions.push(parseCommand(line));
    }
    return instructions;
}

// Array of each row of the input
let [initial, instructions] = fs
.readFileSync(path.join(__dirname, filename), 'utf8') 
.toString()                                           
.trim()                                              
.split('\n\n');

commands = makeInstructions(instructions);


stacks = makeInitialStacks(initial);
for (command of commands) {
    for (let t=0; t<command.nbr ; t++){
        let box = stacks[command.from].pop();
        stacks[command.to].push(box);
    }
}

// Part 1
let p1 = ""
for (stack of stacks) {
    p1 += stack.pop()[1]; 
}


stacks = makeInitialStacks(initial);
for (command of commands) {
    let l = stacks[command.from].length;
    let boxes = stacks[command.from].slice(l-command.nbr,l);
    stacks[command.from] = stacks[command.from].slice(0,l-command.nbr);
    stacks[command.to].push(...boxes);
}

// Part 2
let p2 = ""
for (stack of stacks) {
    p2 += stack.pop()[1]; 
}


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



