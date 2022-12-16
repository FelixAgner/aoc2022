// Start timer
let t0 = new Date();

const fs = require('fs');
const path = require('path');

console.log(`
======================
        Day 16
======================`)
let filename = 'input.txt';

let makeRoom = function(line){
    let neighbors = line.split("to valve")[1];
    if (neighbors[0] != " " ) {neighbors = neighbors.slice(1,neighbors.length)};
    neighbors = neighbors.trim().split(", ").map( (s) => s.trim());

    let name = line.split("Valve ")[1].split( "has")[0].trim();
    return {
        name: name, 
        rate: parseInt(line.split("flow rate=")[1]), 
        neighbors: neighbors
    }
}

makeCave = function(rooms) {

    let nrooms = rooms.length;
    let start = -1;
    
    let rates = new Array(nrooms);
    let indices = {};
    for (let i = 0; i < nrooms ; i++) {
        let room = rooms[i]
        indices[room.name] = i;
        rates[i] = room.rate;
        if (room.name == 'AA') {
            start = i
        };
    }

    let neighbors = new Array(nrooms);

    for (let i = 0; i < nrooms; i++) {
        let room = rooms[i];
        neighbors[i] = new Array(); 
        room.neighbors.forEach( (n) => neighbors[i].push(indices[n]))
    }

    return {
        start: start,
        rates: rates,
        neighbors: neighbors
    };
}

// Read input
let rooms = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n')
    .map( (line) => makeRoom(line));

let cave = makeCave(rooms);

let findBestRecursivePath = function(room, lastroom, time, open ) {
    if (time == 0 ){
        return 0;
    }

    let options = [];
    for (let n of cave.neighbors[room]) {
        if (n != lastroom) {
            options.push(findBestRecursivePath(n, room, time-1, open.slice(0)))
        }
    }
    if (cave.rates[room] != 0 && !open[room]) {
        let newOpen = open.slice(0);
        newOpen[room] = true;
        options.push(findBestRecursivePath(room, room, time-1, newOpen,) + (time-1)*cave.rates[room]);
    }
    return Math.max(...options);
}

// Part 1
let p1 = 0;//findBestRecursivePath(cave.start, -1, 30, new Array(rooms.length).fill(false));

let findDistance = function(start, goal, cave) {
    let visited = [start];
    let costs = {};
    costs[start] = 0;
    let queue = [start];

    while (queue.length > 0) {
        let x = queue.shift();
        if (x == goal) {
            return costs[x];
        }
        for (let neighbor of cave.neighbors[x]) {
            if (!visited.find( e => e == neighbor)) {
                costs[neighbor] = costs[x] + 1;
                queue.push(neighbor);
            }
        }
    }
    return Infinity;
}

let createDistanceMatrix = function (cave) {
    let indices = [cave.start];
    let newRates = [0];
    for (let i = 0; i < cave.rates.length ; i++) {
        if (cave.rates[i] > 0) {
            indices.push(i);
            newRates.push(cave.rates[i]);
        }
    }
    let distances = new Array(indices.length);
    for (let i = 0; i < indices.length ; i++) {
        distances[i] = new Array(indices.length).fill(0);
    }
    for (let i = 0; i < indices.length ; i++) {
        for (let j = i+1 ; j < indices.length ; j ++) {
            dist = findDistance(indices[i], indices[j], cave);
            distances[i][j] = dist;
            distances[j][i] = dist;
        }
    }
    return [distances, newRates];
}

let [distances, rates] = createDistanceMatrix(cave);
let nvalves = distances.length;

let smartestRecursion = function(pos,open,timers,time) {
    if (time <= 0) {
        return 0;
    }
    let [x,y] = pos;
    let [tx,ty] = timers;
    let options = [0];

    if (timers[0] == 0) {
        for (let xnext = 0 ; xnext < nvalves ; xnext ++) {
            if (!open[xnext] && xnext != x) {
                let txnext = distances[x][xnext]+1;
                let tmin = Math.min(ty,txnext);
                let openCopy = open.slice(0);
                openCopy[xnext] = true;
                options.push(smartestRecursion(
                    [xnext,y],
                    openCopy,
                    [txnext-tmin,ty-tmin],
                    time-tmin
                ) + (time-txnext)*rates[xnext]);
            }
        }
    } else {
        for (let ynext = 0 ; ynext < nvalves ; ynext ++) {
            if (!open[ynext] && ynext != y) {
                let tynext = distances[y][ynext]+1;
                let tmin = Math.min(tx,tynext);
                let openCopy = open.slice(0);
                openCopy[ynext] = true;
                options.push(smartestRecursion(
                    [x,ynext],
                    openCopy,
                    [tx-tmin,tynext-tmin],
                    time-tmin
                ) + (time-tynext)*rates[ynext]);
            }
        }
    }
    return Math.max(...options);
}

//Part 2
let p2 = smartestRecursion(
    [0,0],
    new Array(nvalves).fill(false),
    [0,0],
    26
);



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

