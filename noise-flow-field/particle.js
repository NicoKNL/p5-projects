class Particle {
    constructor(x, y, psize) {
        this.psize  = psize;

        this.pos = createVector(x, y);
        this.vel = createVector(0, 0); 
        this.acc = createVector(0, 0);
    }

    add_force(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(4);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }


    render() {
        circle(this.pos.x, this.pos.y, this.psize);
    }
}
