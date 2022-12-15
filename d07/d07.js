// Start timer
let t0 = new Date();
console.log(`
======================
        Day 7
======================`)

const fs = require('fs');
const path = require('path');
let filename = 'input.txt';


let getFileSizes = function(ls) {
    let totalSize = 0;
    for (line of ls) {
        firstArgument = line.split(' ')[0];
        if (firstArgument != "dir" && firstArgument !="ls") {
            totalSize += parseInt(firstArgument);
        }
    }
    return totalSize;
}

// Working under the hypothesis that the explorer does depth first exploration.
//Part 1 
let getTotalSizes = function(input) {

    let cddirname = input[0];
    let ls = input[1].split('\n');

    let thisDirsFileSize = getFileSizes(ls);
    let subDirsFileSize = 0;
    let subDirsRestrictedSize = 0;

    let remainingCommands = input.slice(2,input.length);

    while (remainingCommands.length > 0 && remainingCommands[0] != "cd ..") {
        let subDirSize = 0;
        let subRestrictedSize = 0;
        [subDirSize, subRestrictedSize, remainingCommands] = getTotalSizes(remainingCommands);
        subDirsFileSize += subDirSize;
        subDirsRestrictedSize += subRestrictedSize;
    }

    if (remainingCommands.length > 0 && remainingCommands[0] == "cd ..") {
        remainingCommands = remainingCommands.slice(1,remainingCommands.length);
    }

    let thisDirsTotalSize = thisDirsFileSize + subDirsFileSize;
    let restrictedSize =  thisDirsTotalSize > 100000 ? subDirsRestrictedSize :  subDirsRestrictedSize + thisDirsTotalSize;


    return [thisDirsTotalSize, restrictedSize, remainingCommands];

}

// Part 2
let getMinimumSizes = function(input, threshold) {

    let cddirname = input[0];
    let ls = input[1].split('\n');

    let thisDirsFileSize = getFileSizes(ls);
    let subDirsFileSize = 0;
    let minimumSize = Infinity;

    let remainingCommands = input.slice(2,input.length);

    while (remainingCommands.length > 0 && remainingCommands[0] != "cd ..") {
        let subDirSize = 0;
        let subMinimumSize = 0;
        [subDirSize, subMinimumSize, remainingCommands] = getMinimumSizes(remainingCommands,threshold);
        subDirsFileSize += subDirSize;
        minimumSize = Math.min(minimumSize,subMinimumSize);
    }

    if (remainingCommands.length > 0 && remainingCommands[0] == "cd ..") {
        remainingCommands = remainingCommands.slice(1,remainingCommands.length);
    }

    let thisDirsTotalSize = thisDirsFileSize + subDirsFileSize;
    minimumSize = Math.min(minimumSize, thisDirsTotalSize);
    minimumSize = minimumSize >= threshold ? minimumSize : Infinity;


    return [thisDirsTotalSize, minimumSize, remainingCommands];

}

// Array of each row of the input
let commandLineLog = fs
    .readFileSync(path.join(__dirname, filename), 'utf8') 
    .toString()                                           
    .trim()
    .split('$')
    .map( (s) => s.trim());
commandLineLog = commandLineLog.slice(1,commandLineLog.length);


// Part 1
let [tot, p1, emp] = getTotalSizes(commandLineLog);

// Part 2
let [trash, p2, moretrash] = getMinimumSizes(commandLineLog, tot - 40000000);



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



