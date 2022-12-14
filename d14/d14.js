const { sign } = require('crypto');
const fs = require('fs');
const path = require('path');
const { addListener } = require('process');

let filename = 'input.txt';


// Start timer
let t0 = new Date();

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
    
let makeGrid = function(input) {
    let grid = makeEmptyGrid();
    let greatestDepth = {max: 0};
    input.forEach(
        (line) => addLine(line,grid,greatestDepth)
    );
    return [grid,greatestDepth];
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

let [grid, greatestDepth] = makeGrid(input);

// Part 1
let x = 500;
let y = 0;
let nGrains = 0;

while (y < greatestDepth.max+2) {
    if (grid[x][y+1]) {
        y++;
    } else if (grid[x-1][y+1] ) {
        y++;
        x--;
    } else if (grid[x+1][y+1] ) {
        y++;
        x++;
    } else {
        grid[x][y] = false;
        nGrains++;
        x = 500;
        y = 0;
    }
}

let p1 = nGrains;
console.log(`Solution to part 1: ${p1}`);


//Part 2
[grid, greatestDepth] = makeGrid(input);
x = 500;
y = 0;
nGrains = 0;

while (grid[500][0]) {
    if (y == greatestDepth.max+1) {
        grid[x][y] = false;
        nGrains++;
        x = 500;
        y = 0;
    } else if (grid[x][y+1]) {
        y++;
    } else if (grid[x-1][y+1] ) {
        y++;
        x--;
    } else if (grid[x+1][y+1] ) {
        y++;
        x++;
    } else {
        grid[x][y] = false;
        nGrains++;
        x = 500;
        y = 0;
    }
}
let p2 = nGrains;
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

