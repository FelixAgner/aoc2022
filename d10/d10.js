// Start timer
let t0 = new Date();
console.log(`
======================
        Day 10
======================`)

const fs = require('fs');
const path = require('path');

let filename = 'input.txt';


// Read input
let commands = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n').map(
        (line) => line.split(" ")
    );

//Part 1
let cycle = 0;
let p1 = 0;
let currentVal = 1;
let nextlog = 20;

for (command of commands) {
    if (command[0] == "noop") {
        cycle++;
    } else {
        cycle+=2;
    }
    if ( cycle >= nextlog && cycle < 230){
        p1 += nextlog * currentVal;
        nextlog += 40;
    }

    if (command[0] != "noop") {
        currentVal += parseInt(command[1]);
    }
}
console.log(`Solution to part 1: ${p1}`);


let commandStack = []
for (command of commands) {
    if (command[0] == "noop") {
        commandStack.push(0);
    } else {
        commandStack.push(0);
        commandStack.push(parseInt(command[1]));
    }
}
commandStack = commandStack.reverse();

let screen = "";

let spritePos = 1;
for (let row = 0; row < 6 ; row++) {
    for (let cycle = 0 ; cycle < 40 ; cycle++){
        if (Math.abs(cycle-spritePos) <= 1) {
            screen+='#';
        } else {
            screen+='.';
        }
        spritePos += commandStack.pop();
    }
    screen += "\n";
}
screen.trim();


//Part 2
console.log(`Solution to part 2: \n${screen}`);
let p2 = screen;

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();
console.log(`Solution time: ${t} ms`);

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

