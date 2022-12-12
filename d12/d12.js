const fs = require('fs');
const path = require('path');

let filename = 'input.txt';


// Start timer
let t0 = new Date();

let makeGrid = function(textGrid) {
    let nx = textGrid.length;
    let ny = textGrid[0].length;

    let grid = new Array(nx);
    let start = [0,0];
    let goal = [0,0];
    for (let x = 0 ; x < nx ; x++) {
        grid[x] = new Array(ny);
        for (let y = 0 ; y < ny ; y++){
            let c = textGrid[x][y];
            if (c == 'S') {
                grid[x][y] = 97-97;
                start[0] = x;
                start[1] = y;
            } else if (c == 'E') {
                grid[x][y] = 122-97;
                goal[0] = x;
                goal[1] = y;
            } else {
                grid[x][y] = c.charCodeAt(0)-97;
            }
        }
    }
    return [start, goal, grid];
}

let queueOrder = function(e1,e2) {
    return e1[0] < e2[0]
}

let dijkstra = function(start, goal, grid) {
    let q = [
        [0, start]
    ] // priority queue
    
    let nx = grid.length;
    let ny = grid[0].length;

    let c = new Array(nx);
    for (let i = 0 ; i < nx ; i++) {
        c[i] = new Array(ny).fill(Infinity);
    }
    c[start[0]][start[1]] = 0;

    while (q.length > 0) {
        let [oldcost, [x,y]] = q.pop();        
        if (x == goal[0] && y == goal[1]) {
            return c[x][y];
        }
        height = grid[x][y];

        for ([xnew,ynew] of [[x+1,y], [x-1,y], [x,y+1], [x,y-1]]) {
            if (xnew >= 0 && 
                xnew < nx && 
                ynew >= 0 && 
                ynew < ny && 
                grid[xnew][ynew] <= height+1 &&
                c[x][y]+1 < c[xnew][ynew] ){
                    c[xnew][ynew] = c[x][y]+1;
                    q.push([c[xnew][ynew], [xnew,ynew]]);
                }
            
        }
        q.sort( (a,b) => b[0] - a[0]);
    }
}

let dijkstra2ElectricBoogaloo = function(start, grid) {
    let q = [
        [0, start]
    ] // priority queue
    
    let nx = grid.length;
    let ny = grid[0].length;

    let c = new Array(nx);
    for (let i = 0 ; i < nx ; i++) {
        c[i] = new Array(ny).fill(Infinity);
    }
    c[start[0]][start[1]] = 0;

    while (q.length > 0) {
        let [oldcost, [x,y]] = q.pop();        
        if (grid[x][y] == 0) {
            return c[x][y];
        }
        height = grid[x][y];

        for ([xnew,ynew] of [[x+1,y], [x-1,y], [x,y+1], [x,y-1]]) {
            if (xnew >= 0 && 
                xnew < nx && 
                ynew >= 0 && 
                ynew < ny && 
                grid[xnew][ynew] >= height -1 &&
                c[x][y]+1 < c[xnew][ynew] ){
                    c[xnew][ynew] = c[x][y]+1;
                    q.push([c[xnew][ynew], [xnew,ynew]]);
                }
            
        }
        q.sort( (a,b) => b[0] - a[0]);
    }
}

// Read input
let textGrid = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n').map(
        (line) => line.split("")
    );

let [start,goal,grid] = makeGrid(textGrid);

// Part 1
let p1 = dijkstra(start, goal, grid);
console.log(`Solution to part 1: ${p1}`);


//Part 2
let p2 = dijkstra2ElectricBoogaloo(goal,grid);
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

