// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');

console.log(`
======================
        Day 14
======================`)
let filename = 'input.txt';


let makeEmptyGrid = function() {
    let grid = new Array(1000);
    for (let i = 0 ; i < 1000 ; i++) {
        grid[i] = new Array(200).fill(true);
    }
    return grid;
}

let addLine = function(line, grid, greatestDepth) {
    for (let i = 0 ; i < line.length-1 ; i++) {
        let [x1,y1] = line[i];
        let [x2,y2] = line[i+1];
        greatestDepth.max = Math.max(greatestDepth.max,y1,y2);
        if (x1 == x2) {
            for ( let y = Math.min(y1,y2) ; y <= Math.max(y1,y2) ; y++ ) {grid[x1][y] = false}
        } else {
            for ( let x = Math.min(x1,x2) ; x <= Math.max(x1,x2) ; x++ ) {grid[x][y1] = false}
        }
    }
}
    
let makeCave = function(input) {
    let grid = makeEmptyGrid();
    let greatestDepth = {max: 0};
    input.forEach(
        (line) => addLine(line,grid,greatestDepth)
    );
    return { unBlocked: grid,
             depth: greatestDepth.max};
}

// Read input
let input = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n')
        .map( (line) => line.split(" -> ")
        .map( (point) => point.split(",")
        .map( (coordinate) => parseInt(coordinate))));

// Part 1
let cave = makeCave(input);

let x = 500;
let y = 0;
let xlist = [];
let ylist = [];
let nGrains = 0;


while (y != cave.depth+1) {
    if (cave.unBlocked[x][y+1]) {
        xlist.push(x);
        ylist.push(y);
        y++;
    } else if (cave.unBlocked[x-1][y+1] ) {
        xlist.push(x);
        ylist.push(y);
        y++;
        x--;
    } else if (cave.unBlocked[x+1][y+1] ) {
        xlist.push(x);
        ylist.push(y);
        y++;
        x++;
    } else {
        cave.unBlocked[x][y] = false;
        nGrains++;
        x = xlist.pop();
        y = ylist.pop();
    }
}


cave.unBlocked[x][y] = false;
let p1 = nGrains;


//Part 2
nGrains++;
x = xlist.pop();
y = ylist.pop();
while (cave.unBlocked[500][0]) {
    if (y == cave.depth+1){
        cave.unBlocked[x][y] = false;
        nGrains++;
        x = xlist.pop();
        y = ylist.pop();
    } else if (cave.unBlocked[x][y+1]) {
        xlist.push(x);
        ylist.push(y);
        y++;
    } else if (cave.unBlocked[x-1][y+1] ) {
        xlist.push(x);
        ylist.push(y);
        y++;
        x--;
    } else if (cave.unBlocked[x+1][y+1] ) {
        xlist.push(x);
        ylist.push(y);
        y++;
        x++;
    } else {
        cave.unBlocked[x][y] = false;
        nGrains++;
        x = xlist.pop();
        y = ylist.pop();
    }
}

let p2 = nGrains;


// End timer and log results
console.log(`Solution to part 1: ${p1}`);
console.log(`Solution to part 2: ${p2}`);
let t1 = new Date();
let t = t1.getTime() - t0.getTime();
console.log(`Solution time: ${t} ms`);

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

