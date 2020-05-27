let cell_size;
let columns;
let rows;
let ca2D;
let rules;

function setup() {
    createCanvas(512, 512);
    background(255);
    frameRate(6);
    noStroke();
    current_frame = 0;
    cell_size = 4;
    columns = floor(width / cell_size);
    rows = floor(height / cell_size);
    ca2D = [];

    // initRandom();
    initCenter();

    // Example rules
    // initRules(1846);
    // initRules(1418);
    initRules(1994);

    // Generate random rules
    // let randomRuleSet = (floor(random(1, 2047) / 2.0 ) * 2);
    // initRules(randomRuleSet);
    // console.log('Rule Set: ' + randomRuleSet);

    console.log(rules);
}

function draw() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (ca2D[row][col].current_state === 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(col * cell_size, row * cell_size,
                cell_size - 1, cell_size - 1);
        }
    }

    update();
}

function update() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            let rule = getNeighborCode(row, col);
            ca2D[row][col].set(rules[rule]);
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            ca2D[row][col].update();
        }
    }
}

function getNeighborCode(row, col) {
    let code = 0;
    let neighbors = getNeighbors(row, col);
    for (let i = 0; i < neighbors.length; i++) {
        let x = neighbors[i][0];
        let y = neighbors[i][1];
        code += ca2D[y][x].current_state;
    }

    return code;
}

function getNeighbors(row, col) {
    let neighbors = [];
    for (let y = row - 1; y <= row + 1; y++) {
        for (let x = col - 1; x <= col + 1; x++) {
            neighbors.push([(x + columns) % columns, (y + rows) % rows])
        }
    }

    return neighbors
}

// Fill board randomly
function initRandom() {
    for (let row = 0; row < rows; row++) {
        let ca2D_row = [];
        for (let col = 0; col < columns; col++) {
            ca2D_row.push(new Cell(0));
        }
        ca2D.push(ca2D_row);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            ca2D[row][col].set(random([0, 1]));
            ca2D[row][col].update();
        }
    }
}

function initCenter() {
    for (let row = 0; row < rows; row++) {
        let ca2D_row = [];
        for (let col = 0; col < columns; col++) {
            ca2D_row.push(new Cell(0));
        }
        ca2D.push(ca2D_row);
    }

    // Activate center cell
    let center_row = floor(rows / 2);
    let center_col = floor(columns / 2);
    ca2D[center_row][center_col].set(1);
    ca2D[center_row][center_col].update();
}

function initRules(n) {
    rules = {};

    bit = 0;
    while (n > 0) {
        rules[bit] = n & 1;
        n = n >> 1
        bit++;
    }

    while (bit < 10) {
        rules[bit] = 0;
        bit++;
    }
}
