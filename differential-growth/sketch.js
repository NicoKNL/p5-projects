let INITIAL_POINT_COUNT;
let POINT_COUNT;
let POINTS;
let POINTS_ORDERED;
let RELAX_RADIUS;
let TREE;

function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * Applies subdivision on certain line segments by inserting a point.
 */
function subdivide() {
    let new_points = {};
    let idx = 0;
    for (let i = 0; i < POINT_COUNT - 1; i++) {
        let point_a = POINTS_ORDERED[i];
        let point_b = POINTS_ORDERED[i + 1];
        
        new_points[idx] = point_a;
        idx++;
        // if they are reasonably close, or 10% chance when they are reasonably distant...
        if (distance(point_a, point_b) >= 1.2 * RELAX_RADIUS || (random(1, 100) < 10 && distance(point_a, point_b) > 0.5 * RELAX_RADIUS)) {
            // Divide the edge in two equal parts by introducing center point
            let point_c = point_a.copy().add(point_b).div(2);
            TREE.insert(point_c);
            
            new_points[idx] = point_c;
            idx++;
        }
    }
    new_points[idx] = POINTS_ORDERED[POINT_COUNT - 1];
    idx++;
    
    POINTS_ORDERED = new_points;
    POINT_COUNT = idx;
}

/**
 * Point relaxation of all points, such that they become spaced out a bit more evenly
 * @param iterations in how many steps to perform the relaxation. High iterations = smaller displacements every step.
 */
function relax(iterations) {
    for (let iter = 0; iter < iterations; iter++) {
        let next_tree = new kdTree([], distance, ["x", "y"]);
        let next_points_ordered = {};
        for (let i = 0; i < POINT_COUNT; i++) {
            let point_a = POINTS_ORDERED[i];
            let neighbours = TREE.nearest(point_a, 3, RELAX_RADIUS);
            let offset = createVector(0, 0);
            for (let pb of neighbours) {
                let point_b = createVector(pb[0].x, pb[0].y);
                let diff_vector = point_a.copy().sub(point_b);
                offset.add(diff_vector).setMag(RELAX_RADIUS / iterations);
            }
            let next_point_a = point_a.copy().add(offset);
            next_tree.insert(next_point_a);
            next_points_ordered[i] = next_point_a;
        }
        TREE = next_tree;
        POINTS_ORDERED = next_points_ordered;
    }
}

function setup() {
    createCanvas(1024, 1024);
    INITIAL_POINT_COUNT = 10;
    RELAX_RADIUS = 20;
    POINT_COUNT = 0;
    POINTS = [];
    POINTS_ORDERED = {};
    frameRate(1);
    noFill();
    stroke(255);

    let step = 360.0 / INITIAL_POINT_COUNT;
    for (let i = 0; i < INITIAL_POINT_COUNT; i++) {
        let x = cos(radians(i * step)) * width / 10 + width / 2;
        let y = sin(radians(i * step)) * height / 10 + height / 2;
        let p = createVector(x, y);
        POINTS_ORDERED[i] = p;
        POINTS.push(p);
        POINT_COUNT++;
    }

    TREE = new kdTree(POINTS, distance, ["x", "y"]);
}

function draw() {
    // put drawing code here
    background(25);

    beginShape();
    console.log(POINT_COUNT);
    for (let i = 0; i < POINT_COUNT; i++) {
        let p = POINTS_ORDERED[i];
        vertex(p.x, p.y);
        // circle(p.x, p.y, RELAX_RADIUS * 2);
    }
    endShape();

    subdivide();
    relax(10);
}
