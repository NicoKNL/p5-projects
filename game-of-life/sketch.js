let cell_size;
let columns;
let rows;
let board;

let c;
let current_frame;
function setup() {
    c = createCanvas(512, 512);
    current_frame = 0;
    frameRate(6);
    noStroke();

    cell_size = 4;
    columns = floor(width / cell_size);
    rows = floor(height / cell_size);

    board = [];
    for (let row = 0; row < rows; row++) {
        let board_row = [];
        for (let col = 0; col < columns; col++) {
            board_row.push(new Cell(0));
        }
        board.push(board_row);
    }
    initRandom();
}

function draw() {
    background(255);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col].current_state === 1) {
                fill(0); // white
            } else {
                fill(255); // black
            }
            rect(col * cell_size, row * cell_size, cell_size - 1, cell_size - 1);
        }
    }
    let filename = `${current_frame}`
    // saveCanvas(c, "frame_" + filename.padStart(3, "0") + ".png");
    current_frame += 1;
    update();
}

// Fill board randomly
function initRandom() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            board[row][col].current_state = random([0, 1]);
        }
    }
}

function update() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            let neighbors = getNeighbors(row, col);
            let count = 0;
            for (let i = 0; i < neighbors.length; i++) {
                let x = neighbors[i][0];
                let y = neighbors[i][1];
                count += board[y][x].current_state;
            }

            if (board[row][col].current_state === 0) {
                board[row][col].next_state = (count === 3) ? 1 : 0;
            } else {
                board[row][col].next_state = (count < 2 || count > 3) ? 0 : 1;
            }
        }
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            board[row][col].update();
        }
    }
}

function getNeighbors(row, col) {
    let neighbors = [];
    for (let y = row - 1; y <= row + 1; y++) {
        for (let x = col - 1; x <= col + 1; x++) {
            if (x === col && y === row) continue;
            neighbors.push([(x + columns) % columns, (y + rows) % rows])
        }
    }
    return neighbors
}
