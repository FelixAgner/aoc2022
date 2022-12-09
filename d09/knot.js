const DIRMAP = {
    'R': 1,
    'L':-1,
    'U':1,
    'D':-1,
}

class Knot {
    constructor(depth){
        this.head = {
            x: 0,
            y: 0,
        };
        this.depth = depth;
        this.visited = {"0:0":true};
        this.nvisited = 1;
        this.tail = depth > 1 ? new Knot(depth-1) : undefined;
    }

    getVisited(){
        if (this.depth > 1) {
            return this.tail.getVisited();
        } else {
            return this.nvisited;
        }
    }

    catchup(x,y){
        
        let dx = x - this.head.x
        let dy = y - this.head.y

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1){

            if (Math.abs(dx) != 0 ) {
                this.head.x += Math.sign(dx);
            }  
            if (Math.abs(dy) != 0) {
                this.head.y += Math.sign(dy);
            }

            if (this.depth > 1 ) {
                this.tail.catchup(this.head.x,this.head.y);
            } else {
                if (this.visited[this.coordinateString()] == undefined) {
                    this.visited[this.coordinateString()] = true;
                    this.nvisited++;
                } 
            }
        }


    }

    move(input){
        let [dir, steps] = input.split(" ");
        for (let i = 0 ; i < parseInt(steps) ; i++){
            if (dir == "R" || dir == "L"){
                this.head.x += DIRMAP[dir];
            } else if (dir == "U" || dir == "D") {
                this.head.y += DIRMAP[dir];
            } else {
                console.log(`Unexpected direction ${dir}`)
            }
            this.tail.catchup(this.head.x,this.head.y);
        }
    }

    coordinateString(){
        return `${this.head.x}:${this.head.y}`;
    }
}

module.exports = {
    Knot
};