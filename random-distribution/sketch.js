let counter;

function setup() {
	createCanvas(256, 256);
	background(100);
    counter = new Array(width).fill(0);
}

function draw() {
    let random_x = floor(random() * width);
    counter[random_x]++;

    let y = counter[random_x];
    point(random_x, y);
}

