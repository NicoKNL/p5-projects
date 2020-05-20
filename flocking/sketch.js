let BOIDS;
let BOID_ID;

let c;
let current_frame;

function setup() {
    // put setup code here
    c = createCanvas(1280, 720);
    current_frame = 0;
    BOID_ID = 0;
    BOIDS = [];

    for (i = 0; i < BOID_COUNT; i++) {
        let x = random(0, width);
        let y = random(0, height);
        BOIDS.push(new Boid(BOID_ID, x, y));
        BOID_ID++;
    }
}

function draw() {
    // put drawing code here
    background(25);

    for (let boid_a of BOIDS) {
        let neighbours = get_neighbours(boid_a);

        let separation = get_separation_force(boid_a, neighbours).mult(C_SEPARATION);
        let cohesion   = get_cohesion_force(boid_a, neighbours).mult(C_COHESION);
        let alignment  = get_alignment_force(boid_a, neighbours).mult(C_ALIGNMENT);

        boid_a.add_force(separation);
        boid_a.add_force(cohesion);
        boid_a.add_force(alignment);

        boid_a.update();
        boid_a.render();
    }

    let filename = `${current_frame}`
    // saveCanvas(c, "frame_" + filename.padStart(3, "0") + ".png");
    current_frame += 1;
}
