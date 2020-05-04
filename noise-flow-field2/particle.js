class Particle {
    constructor(x, y, psize) {
        this.psize  = psize;

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0); 
        this.acc = createVector(0, 0);
        this.prev_pos = this.pos;
    }

    add_force(force) {
        this.acc.add(force);
    }

    update() {
        this.prev_pos = this.pos.copy();
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
        if (this.pos.dist(this.prev_pos) > 5) {
            this.prev_pos = this.pos.copy();
        }
    }


    render() {
        strokeWeight(this.psize);
        line(this.pos.x, this.pos.y, this.prev_pos.x, this.prev_pos.y);        
        //circle(this.pos.x, this.pos.y, this.psize);
    }
}
