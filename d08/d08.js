const fs = require('fs');
const path = require('path');
let filename = 'input.txt';

let makeEmptyFalse = function(n) {
    let isVisible = new Array(n);
    for (let i = 0 ; i < n ; i++) {
        isVisible[i] = new Array(n).fill(false);
    }
    return isVisible
}

let getVisible = function(forest) {
    // assume square
    let n = forest.length;
    
    let isVisible = makeEmptyFalse(n);
    let nVisible = 0;
    
    // God I wish I had matrix functionality...

    // Search up and down
    for (let i = 0; i < n ; i++) {
        let j = 0;
        let maxval = -1;
        while (j < n && maxval < 9) {
            if (!isVisible[i][j] && forest[i][j] > maxval){
                nVisible++;
                isVisible[i][j] = true;
            }
            maxval = Math.max(maxval, forest[i][j]);
            j++;
        }
    
        j = n-1;
        maxval = -1;
        while (j >= 0 && maxval < 9) {
            if (!isVisible[i][j] && forest[i][j] > maxval){
                nVisible++;
                isVisible[i][j] = true;
            }
            maxval = Math.max(maxval, forest[i][j]);
            j--;
        }
    }
    
    // Search left and right
    for (let j = 0; j < n ; j++) {
        let i = 0;
        let maxval = -1;
        while (i < n && maxval < 9) {
            if (!isVisible[i][j] && forest[i][j] > maxval){
                nVisible++;
                isVisible[i][j] = true;
            }
            maxval = Math.max(maxval, forest[i][j]);
            i++;
        }
    
        i = n-1;
        maxval = -1;
        while (i >= 0 && maxval < 9) {
            if (!isVisible[i][j] && forest[i][j] > maxval){
                nVisible++;
                isVisible[i][j] = true;
            }
            maxval = Math.max(maxval, forest[i][j]);
            i--;
        }
    }
    return nVisible;
}

let getViewingDistance = function(x,y,forest) {
    let n = forest.length;
    let val = forest[x][y];
    let a = 1;
    while (x + a < n-1 && forest[x+a][y] < val) {
        a++;
    }

    let b = 1;
    while (x - b > 0 && forest[x-b][y] < val) {
        b++;
    }

    let c = 1;
    while (y + c < n-1 && forest[x][y+c] < val) {
        c++;
    }

    let d = 1;
    while (y - d > 0 && forest[x][y-d] < val) {
        d++;
    }

    return a*b*c*d;
}

let getBestViewingDistance = function(forest) {
    let bestView = 0;
    let n = forest.length;
    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            bestView = Math.max(bestView, getViewingDistance(x,y,forest));
        }    
    }
    return bestView;
}

// Start timer
let t0 = new Date();

// Read input
let forest = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('\n')
    .map( (s) => s.split("")
    .map( (i) => parseInt(i)));

//console.log(forest)
p1 = getVisible(forest);
console.log(p1);

p2 = getBestViewingDistance(forest);
console.log(p2);

// End timer
let t1 = new Date();
let t = t1.getTime() - t0.getTime();

module.exports = {
    p1, // Part 1
    p2, // Part 2
    t   // Execution time
};

