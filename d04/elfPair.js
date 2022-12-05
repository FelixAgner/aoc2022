class ElfPair {
    constructor(str) {
      let [left,right] = str.split(',');
      this.first = left.split('-').map((i) => parseInt(i));
      this.second = right.split('-').map((i) => parseInt(i));
    }

    // Method
    fullyOverlaps() {
        return (this.first[0]-this.second[0])*(this.first[1]-this.second[1]) <= 0;
    }

    isOverlapping() {
        return !( this.first[1] < this.second[0] || this.first[0] > this.second[1]);
    }
  }

module.exports = {
    ElfPair
}