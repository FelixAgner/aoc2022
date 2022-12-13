class WeirdNumber {

    constructor(str) {
        this.subnumbers = [];
        let parseIndex = 1;
        while (parseIndex < str.length - 1) {
            if (str[parseIndex] != '[') { // Handle the case when the number is an integer of unknown length
                let intstop = 1;
                while (str[parseIndex+intstop] != "]" &&  str[parseIndex+intstop] != ",") {
                    intstop++;
                }
                this.subnumbers.push( parseInt( str.slice( parseIndex, parseIndex+intstop)));
                parseIndex += intstop+1;
            } else {
                let numstop = 0;
                let depth = 1;
                while (depth > 0) {
                    numstop ++;
                    depth = str[parseIndex+numstop] == '[' ? depth + 1 : str[parseIndex+numstop] == ']' ? depth -1 : depth;
                }
                this.subnumbers.push( new WeirdNumber( str.slice( parseIndex, parseIndex + numstop + 1)));
                parseIndex += numstop + 2;
            }
        }

    }

    length() {
        return this.subnumbers.length;
    }

    compare(otherNumber){

        for (let i = 0 ; i < Math.min(this.length(), otherNumber.length()) ; i++) {
            let a = this.subnumbers[i];
            let b = otherNumber.subnumbers[i];
            let comparison = 0;
            if (Number.isInteger(a) && Number.isInteger(b)) {
                comparison = a < b ? 1 : a > b ? -1 : 0;
            } else if (Number.isInteger(a)) {
                comparison = new WeirdNumber(`[${a}]`).compare(b);
            } else if (Number.isInteger(b)) {
                comparison = a.compare(new WeirdNumber(`[${b}]`));
            } else {
                comparison = a.compare(b);
            }
            if (comparison != 0) {
                return comparison;
            }

        }
        if (this.length() < otherNumber.length()) {
            return 1;
        } else if (this.length() > otherNumber.length()) {
            return -1;
        } else {
            return 0;
        }
    }

    toString() {
        let str = "[";
        if (this.length() < 2){
            this.subnumbers.forEach( (s) => str += s.toString());
            return str + "]";
        }
        this.subnumbers.forEach( (s) => str += s.toString()+",");
        return str.slice(0,-1) + "]";
    }
    
}

module.exports = {
    WeirdNumber
};