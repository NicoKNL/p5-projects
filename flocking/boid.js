class Boid {
    constructor(id, x, y) {
        this.id = id;
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector(0, 0);
    }

    add_force(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(MAX_VELOCITY); // Max velocity
        this.pos.add(this.vel);
        this.acc.set(0, 0);

        this.border_control();
    }

    border_control() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());

        draw_spaceship();
        draw_neighbourhood(); // Visualization of logic
        pop();
    }
}
