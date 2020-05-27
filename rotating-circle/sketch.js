let rotation;
let circle_size;

function setup() {
    createCanvas(512, 512);

    fill(255);
    noStroke();
    
    rotation = 0;
    circle_size = 50;
}

function draw() {
    background(75); // Clear the screen

    // Circle position
    let x = cos(radians(rotation)) * width / 4 + width / 2;
    let y = sin(radians(rotation)) * height / 4 + height / 2;

    // Draw!
    circle(x, y, circle_size);

    // Rotate 1 degree further
    rotation = (rotation + 1) % 360;
}
