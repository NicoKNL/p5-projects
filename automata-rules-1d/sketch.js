let cell_size;
let columns;

let ca1D;
let current_row;
let rules;

function setup() {
    c = createCanvas(1024, 1024);
    background(255);
    noStroke();

    cell_size = 4;
    columns = floor(width / cell_size);

    init();

    // initRules(110);
    // initRules(26); // interesting
    // initRules(128); // interesting
    initRules(60); // interesting
    // initRules(91);
    // initRules(135);
    // let randomRuleSet = floor(random(1, 255))
    // initRules(randomRuleSet);
    // console.log('Rule Set: ' + randomRuleSet);
    console.log(rules);
}

function draw() {
    for (let col = 0; col < columns; col++) {
        if (ca1D[col].current_state == 1) {
            fill(0);
        } else {
            fill(255);
        }
        rect(col * cell_size, current_row * cell_size,
             cell_size - 1, cell_size - 1);
    }

    update();
    current_row++;

    if (current_row > columns) {
        noLoop();
    }
}

function update() {
    for (let col = 0; col < columns; col++) {
        let rule = getNeighborCode(col);
        if (rule !== 0 || (rule === 0 && ca1D[col].alive)) {
            ca1D[col].set(rules[rule]);
        }
    }

    for (let col = 0; col < columns; col++) {
        ca1D[col].update();
    }
}

function getNeighborCode(col) {
    let code = 0;
    if (col > 0) {
        if (ca1D[col - 1].current_state === 1) {
            code += 4;
        }
    }

    if (ca1D[col].current_state === 1) {
        code += 2;
    }

    if (col < columns - 1) {
        if (ca1D[col + 1].current_state === 1) {
            code += 1;
        }
    }

    return code;
}

function init() {
    current_row = 0;
    ca1D = [];
    for (let col = 0; col < columns; col++) {
        ca1D.push(new Cell(0));
    }

    // Update 1 cell in the center to be black and alive
    let center_cell = floor(columns / 2);
    ca1D[center_cell].set(1);
    ca1D[center_cell].update();
}

function initRules(n) {
    rules = {};

    bit = 0;
    while (n > 0) {
        rules[bit] = n & 1;
        n = n >> 1
        bit++;
    }

    while (bit < 8) {
        rules[bit] = 0;
        bit++;
    }
}
