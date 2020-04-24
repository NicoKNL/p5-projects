function draw_spaceship() {
    noStroke();
    fill(255);
    circle(0, 0, 16);
    beginShape();
    vertex(0, 8);
    vertex(-15, 8);
    vertex(-13, 6);
    vertex(0, 3);
    vertex(0, -3);
    vertex(-13, -6);
    vertex(-15, -8);
    vertex(0, -8);
    endShape(CLOSE);
}

function draw_neighbourhood() {
    noStroke();
    fill(255, 15);

    beginShape();
    vertex(0, 0);

    let steps = 20;
    let angle_start = - FIELD_OF_VISION / 2;
    let angle_step = FIELD_OF_VISION / steps;

    for (let i = 0; i < steps + 1; i++) {
        let x = cos(radians(angle_start + i * angle_step)) * NEIGHBOURHOOD_RADIUS;
        let y = sin(radians(angle_start + i * angle_step)) * NEIGHBOURHOOD_RADIUS;
        vertex(x, y);
    }
    endShape(CLOSE);
}
