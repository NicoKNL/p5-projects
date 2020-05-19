let rules;
let axiom;
let sentence;
let sentences;
let depth;
let offset;
let angle;
let scale;

function setup() {
    createCanvas(1024, 1024);
    translate(width / 2, height / 2);
    rotate(radians(-90));

    depth = 0;
    rules = {};

    // offset = 10;
    // angle = radians(20);
    // scale = 1;
    // rules['F'] = 'FF+[+F-F-F]-[-F+F+F]';
    // axiom = 'F';

    // offset = 10;
    // angle = radians(36);
    // scale = 0.8;
    // rules['F'] = 'F[+FF][-FF]F[-F][+F]F';
    // axiom = 'F';

    // offset = 10;
    // angle = radians(90);
    // scale = 1;
    // rules['F'] = 'F-M+FF-F-FF-FM-FF+M-FF+F+FF+FM+FFF';
    // rules['M'] = 'MMMMMM';
    // axiom = 'F-F-F-F';

    // offset = 250;
    // angle = radians(90);
    // scale = .7;
    // rules['F'] = 'F[+F][-F]';
    // axiom = '[F][--F]';

    // offset = 5;
    // angle = radians(80);
    // scale = 1;
    // rules['F'] = 'F+F--F+F';
    // axiom = 'F';

    // FRACTAL!!-----------------------------------------------
    offset = 250;
    angle = radians(45);
    scale = .65;
    rules['F'] = 'F[+F][-F]';
    axiom = '[F][----F]';

    // SIERPINSKI
    // offset = 50;
    // angle = radians(120);
    // scale = 1;
    // rules['F'] = 'F-G+F+G-F';
    // rules['G'] = 'GG';
    // axiom = 'F-G-G';

    // PLANT
    // offset = 4;
    // angle = radians(25);
    // scale = .9;
    // rules['F'] = 'FF';
    // rules['X'] = 'F+[[X]-X]-F[-FX]+X';
    // axiom = 'X';

    sentences = [axiom];
    sentence = axiom;

    renderSentence();
    noLoop();
}

function mousePressed() {
    depth += 1;
    // console.log('current sentence: ' + sentence);
    if (sentences.length > depth) {
        sentence = sentences[depth];
    } else {
        sentence = generateNext();
    }
    renderSentence();
}

function generateNext() {
    let old_sentence = sentences[depth - 1];
    let new_sentence = '';

    for (let i = 0; i < old_sentence.length; i++) {
        let c = old_sentence.charAt(i);
        if (c in rules) {
            new_sentence += rules[c];
        } else {
            new_sentence += c;
        }
    }

    sentences.push(new_sentence);
    return new_sentence;
}

function renderSentence() {
    background(125);
    stroke(0);
    push();
    let current_depth = 0;
    for (let i = 0; i < sentence.length; i++) {
        let c = sentence.charAt(i);
        if (c === 'F' || c === 'G') {
            line(0, 0, offset * pow(scale, current_depth), 0);
            translate(offset * pow(scale, current_depth), 0);
        } else if (c === 'M') {
            translate(offset * pow(scale, current_depth), 0);
        } else if (c === '+') {
            rotate(angle);
        } else if (c === '-') {
            rotate(-angle);
        } else if (c === '[') {
            push();
            current_depth += 1;
        } else if (c === ']') {
            pop();
            current_depth -= 1;
        }
    }
    pop();
}