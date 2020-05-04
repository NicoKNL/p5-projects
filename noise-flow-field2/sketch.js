let particles;
let iteration;
let gridsize;
let scale;
let colums;
let rows;
let step;
let fr;
let z_offset;
let iteration_limit;
let particle_count;

function setup() {
    //createCanvas(200, 200);
    createCanvas(1280, 720);
    scale = 10;
    columns = floor(width / scale);
    rows = floor(height / scale);
    step = 0.1;
    iteration = 0;
    gridsize = 10;
    z_offset = 0;
    fr = createP('');
    noStroke();
    iteration_limit = 500;
    particle_count = 500;
    background(220, 20, 60);
}

function draw() {
    if (iteration == 0) {
        generate_particles(30, 10);
    } else if (iteration == 1 * iteration_limit) {
        generate_particles(20, 50);
    } else if (iteration == 2 * iteration_limit) {
        generate_particles(10, 100);
    } else if (iteration == 3 * iteration_limit) {
        generate_particles(5, 150);
    } else if (iteration == 4 * iteration_limit) {
        generate_particles(3, 200);
    } else if (iteration == 5 * iteration_limit) {
        generate_particles(1, 225);
    } else if (iteration == 6 * iteration_limit) {
        noLoop();
    }

    z_offset += 0.01;
    update_particles();
    fr.html(floor(frameRate()));
    iteration++;
}

function generate_particles(psize, pcolor) {
    randomSeed(42);
    z_offset = 0;
    particles = [];
    strokeWeight(psize);
    stroke(pcolor);
    for (let i = 0; i < particle_count; i++) {
        let x = random(width);
        let y = random(height);
        particles.push(new Particle(x, y, psize));
    }
}

function update_particles() {
    for (let p of particles) {
        //let angle = noise(p.pos.x, p.pos.y) * 8 * PI
        let col = floor(p.pos.x / scale);
        let row = floor(p.pos.y / scale);
        let angle = noise(col * step, row * step, z_offset) * 2 * TWO_PI;
        let noise_field_force = p5.Vector.fromAngle(angle).setMag(3);
        p.add_force(noise_field_force);
        p.update();
        p.render();
    }
}
