var assert = require('assert');

const fs = require('fs');
const path = require('path');

describe('Day 4',function() {
  const {ElfPair} = require('./d04/elfPair');
  let testinput = fs
    .readFileSync(path.join(__dirname, "d04/test_input.txt"), 'utf8') 
    .toString()                                           
    .trim()                                              
    .split('\n');
  
  let testlength = testinput.length;

  describe('Parsing', function() {
    elves = [
      [2,4,6,8],
      [2,3,4,5],
      [5,7,7,9],
      [2,8,3,7],
      [6,6,4,6],
      [2,6,4,8]
    ]
    let equalElves = function(elf,v){
      return elf.first[0] == v[0] && elf.first[1] == v[1] && elf.second[0] == v[2] && elf.second[1] == v[3];
    }
    for (let i = 1 ; i < testlength ; i++) {
      it(`Pair ${i} should be ${elves[i]}.`, function () {
        let ep = new ElfPair(testinput[i]);
        assert.equal(equalElves(ep,elves[i]), true);
      });
    }
  });  
  
  describe('Part 1', function () {
    res1 = [0, 0, 0, 1, 1, 0];
    str1 = ["shouldn't", "shouldn't", "shouldn't", "should", "should", "shouldn't"]
    for (let i = 1 ; i < testlength ; i++) {
      it(`Pair ${i} ${str1[i]} overlap fully.`, function () {
        assert.equal( new ElfPair(testinput[i]).fullyOverlaps(), res1[i])
      });
    }
  });
  
  describe('part 2', function() {
    let res2 = [0, 0, 1, 1, 1, 1];
    let str2 = ["shouldn't", "shouldn't", "should", "should", "should", "should"]
    for (let i = 0 ; i < testlength ; i++) {
      it(`Pair ${i} ${str2[i]} overlap.`, function () {
        assert.equal( new ElfPair(testinput[i]).isOverlapping(), res2[i])
      });
    } 
  }); 
});
