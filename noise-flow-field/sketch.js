let particles;
let iteration;
let gridsize;

function setup() {
    createCanvas(640, 480);
    //createCanvas(1920, 1080);
    iteration = 0;
    noStroke();
    background(0);
    gridsize = 10;
}

function draw() {
    //if (iteration == 0) {
    //    generate_particles(1000, 30, 255);
    //} else if (iteration == 100) {
    //    generate_particles(1000, 20, 200);
    //} else if (iteration == 200) {
    //    generate_particles(1000, 10, 150);
    //} else if (iteration == 300) {
    //    generate_particles(2000, 5, 100);
    //} else if (iteration == 400) {
    //    generate_particles(3000, 3, 50);
    //} else if (iteration == 500) {
    //    generate_particles(5000, 1, 0);
    //}
    if (iteration == 0) {
        generate_particles(1000, 2, 255);
    }
    update_particles();
    iteration++;
}

function generate_particles(count, psize, pcolor) {
    particles = [];
    fill(pcolor, pcolor, pcolor, 25);
    for (let i = 0; i < count; i++) {
        let x = random(width);
        let y = random(height);
        particles.push(new Particle(x, y, psize));
    }
}

function update_particles() {
    for (let p of particles) {
        //let angle = noise(p.pos.x, p.pos.y) * 8 * PI;
        let angle = noise(Math.floor(p.pos.x / gridsize) * gridsize, Math.floor(p.pos.y / gridsize) * gridsize, iteration * 0.0003) * 8 * PI;
        let noise_field_force = p5.Vector.fromAngle(angle);
        p.add_force(noise_field_force);
        p.update();
        p.render();
    }
}
