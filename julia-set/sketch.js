let PHI = 1.61803398875;

class Complex {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    square() {
        let new_a = this.a * this.a - this.b * this.b;
        let new_b = 2 * this.a * this.b;
        this.a = new_a;
        this.b = new_b;
    }

    add(other) {
        this.a += other.a;
        this.b += other.b;
    }

    copy() {
        return new Complex(this.a, this.b);
    }
}

function is_in_mandelbrot_set(z) {
    // let c = z.copy(); // Mandelbrot!
    // let c = new Complex(1 - PHI, 0); // 1 - golden ratio
    // let c = new Complex(PHI - 2, PHI - 1);
    // let c = new Complex(0.285, 0);

    for (let i = 0; i < 100; i++) {
        // f_c(z) = z^2 + c
        z.square();
        z.add(c);

        if (abs(z.a) > 4 || abs(z.b) > 4) {
            return i;
        }
    }
    return 100;
}

function color_pixel(x, y, value) {
    value = map(value, 0, 100, 0, 255);

    let pixel_index = (x + y * width) * 4;
    pixels[pixel_index + 0] = value;
    pixels[pixel_index + 1] = value;
    pixels[pixel_index + 2] = value;
    pixels[pixel_index + 3] = 255;
}

function setup() {
    // put setup code here
    createCanvas(512, 512);
    pixelDensity(1);
    background(255);
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // z = a + bi
            let a = map(x, 0, width, -1.5, 1.5);
            let b = map(y, 0, height, -1.5, 1.5);
            let z = new Complex(a, b);

            let value = is_in_mandelbrot_set(z);
            color_pixel(x, y, value);
        }
    }
    updatePixels();
}
