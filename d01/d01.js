const fs = require('fs');
const path = require('path');

let filename = 'input.txt';

let readTotalCals = function (pack) {
    let totalCals = 0
    for (let snack of pack.split('\n')) {
        totalCals += parseInt(snack)
    }
    return totalCals
}



console.log("reading inputs")
let calories = fs
	.readFileSync(path.join(__dirname, filename), 'utf8')
	.toString()
	.trim()
	.split('\n\n')
	.map((pack) => readTotalCals(pack))
    .sort(function(a, b){return b - a});


console.log(calories);


let snackSum = 0
for (let i = 0; i<3; i++){
    console.log(calories[i])
    snackSum += calories[i];
}

console.log(snackSum)

let p1 = calories[0];
let p2 = snackSum;

module.exports = {
    p1,p2
};



