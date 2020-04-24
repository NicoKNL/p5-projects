function angle_check(boid_a, boid_b) {
    let angle_a = boid_a.vel.copy().normalize();
    let angle_b = (boid_b.pos.copy().sub(boid_a.pos.copy())).normalize();
    let angle_ab = angle_a.angleBetween(angle_b);
    return abs(degrees(angle_ab)) <= FIELD_OF_VISION;
}

function get_neighbours(boid_a) {
    let neighbours = [];
    for (let boid_b of BOIDS) {
        if (boid_a.id != boid_b.id && boid_a.pos.dist(boid_b.pos) <= NEIGHBOURHOOD_RADIUS && angle_check(boid_a, boid_b)) {
            neighbours.push(boid_b);
        }
    }
    return neighbours;
}

function get_separation_force(boid_a, neighbours) {
    let separation = createVector(0, 0);

    for (let boid_b of neighbours) {
        let pos_a = boid_a.pos.copy();
        let pos_b = boid_b.pos.copy();
        let diff = (pos_a.sub(pos_b)).normalize();
        diff.div(p5.Vector.dist(boid_a.pos, boid_b.pos))
        separation.add(diff);
    }
    return separation.normalize();
}

function get_alignment_force(boid_a, neighbours) {
    let alignment = createVector(0, 0);

    if (neighbours.length == 0) {
        return alignment;
    }

    for (let boid_b of neighbours) {
        let dir_b = boid_b.vel.copy().normalize();
        dir_b.div(p5.Vector.dist(boid_a.pos, boid_b.pos));
        alignment.add(dir_b);
    }

    return alignment.normalize();
}

function get_cohesion_force(boid_a, neighbours) {
    let cohesion = createVector(0, 0);

    if (neighbours.length == 0) {
        return cohesion;
    }

    let avg_position = createVector(0, 0);

    for (let boid_b of neighbours) {
        avg_position.add(boid_b.pos);
    }

    avg_position.div(neighbours.length);
    cohesion.add(avg_position.sub(boid_a.pos));
    return cohesion.normalize();
}
