let max_depth;
function setup() {
    createCanvas(1024, 1024);
    stroke(0);
    noFill();
    max_depth = 1;
}

function draw() {
    background(225);

    let center_x = width / 2;
    let center_y = height / 2;

    let corners = [];
    let base_size = 400;
    for (let i = 0; i < 3; i++) {
        let x = center_x + cos(radians(120 * i + 30)) * base_size;
        let y = center_y + sin(radians(120 * i + 30)) * base_size;

        corners.push(createVector(x, y));
    }

    sierpinski(corners, 0);
}

function sierpinski(corners, depth) {
    if (depth == max_depth) return;

    beginShape();
    for (let corner of corners) {
        vertex(
            corner.x,
            corner.y
        );
    }
    endShape(CLOSE);

    // Previous
    let p0 = corners[0];
    let p1 = corners[1];
    let p2 = corners[2];

    // Halfway points => new corners
    let p3 = p0.copy().add(p1).div(2);
    let p4 = p1.copy().add(p2).div(2);
    let p5 = p0.copy().add(p2).div(2);

    // Recurse!
    sierpinski([p0, p3, p5], depth + 1);
    sierpinski([p3, p1, p4], depth + 1);
    sierpinski([p5, p4, p2], depth + 1);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        max_depth++;
    } else if (keyCode === DOWN_ARROW) {
        max_depth--;
    }
}
