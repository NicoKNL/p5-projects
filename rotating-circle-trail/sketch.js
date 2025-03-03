let base_color;
let rotation;
let circle_size;
let circle_alpha_decay;
let circle_size_decay;
let circle_count;

function setup() {
    // put setup code here
    createCanvas(512, 512);

    base_color = color(255, 0, 60);
    rotation = 0;
    circle_size = 50;
    circle_size_decay = 0.995;
    circle_alpha_decay = 0.975;
    circle_count = 300;
    noStroke();
}

function draw() {
    background(25);

    for (i = 0; i < circle_count; i++) {
        let x = cos(radians(rotation - i)) * width / 4 + width / 2;
        let y = sin(radians(rotation - i)) * height / 4 + height / 2;
        let circle_color = base_color;
        circle_color.setAlpha(255 * pow(circle_alpha_decay, i));
        fill(circle_color);
        circle(x, y, circle_size * pow(circle_size_decay, i));
    }

    rotation = (rotation + 1) % 360;
}
