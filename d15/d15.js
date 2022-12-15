const fs = require('fs');
const path = require('path');

console.log(`
======================
        Day 15
======================`)
let filename = 'input.txt';


// Start timer
let t0 = new Date();

let manhattan = function(sensor,beacon) {
    return Math.abs(beacon.x-sensor.x) + Math.abs(beacon.y-sensor.y);
}

let parseLine = function(line) {
    let [s,b] = line.split(": closest beacon is at ");
    
    let beacon = {
        x: parseInt(b.split('=')[1]),
        y: parseInt(b.split('=')[2]),
    }
    let sensor = {
        x: parseInt(s.split('=')[1]),
        y: parseInt(s.split('=')[2]),
    }
    sensor.dist = manhattan(sensor,beacon);
    sensor.closest = beacon;
    return sensor;
}

let overlap = function(range1, range2) {
    return  (range1[0] <= range2[0] && range1[1] >= range2[0] ) ||
            (range1[1] >= range2[1] && range1[0] <= range2[1] ) ||
            (range1[0] >= range2[0] && range1[1] <= range2[1] ) ||
            (range1[0] <= range2[0] && range1[1] >= range2[1] );
}

// Read input
let sensors = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n')
    .map( (line) => parseLine(line));

// Part 1
let ranges = [];
let beaconsOnLine = []
for (sensor of sensors) {
    let dy = sensor.dist - Math.abs(sensor.y-2000000);
    if  (dy >= 0) {
        let newrange = [sensor.x-dy,sensor.x+dy]
        let notAdded = true;
        for (range of ranges) {
            if (overlap(range, newrange)) {
                range[0] = Math.min(range[0],newrange[0]);
                range[1] = Math.max(range[1],newrange[1]);
                notAdded = false;
            }
        }
        if (notAdded) {ranges.push(newrange)};
    }
    if (sensor.closest.y == 2000000 ) {
        beaconsOnLine.push(sensor.beacon);
    }
}

if (overlap(ranges[1],ranges[0])) {
    ranges[0][0] = Math.min(ranges[0][0],ranges[1][0]);
    ranges[0][1] = Math.max(ranges[0][1],ranges[1][1]);
}
console.log(ranges);
let p1 = ranges[0][1] - ranges[0][0];
console.log(`Solution to part 1: ${p1}`);


//Part 2
let p2 = 0;
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

