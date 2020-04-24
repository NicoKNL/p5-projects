function setup() {
    createCanvas(1024, 1024);
    stroke(0);
    noFill();
}

function draw() {
    background(225);
    draw_circle(width / 2, height / 2, 300);
}

function draw_circle(x, y, size) {
    if (size < 3) return;
    circle(x, y, size);
    draw_circle(x + size / 2, y, size / 2);
    draw_circle(x - size / 2, y, size / 2);
    draw_circle(x, y + size / 2, size / 2);
    // draw_circle(x, y - size / 2, size / 2);
}
