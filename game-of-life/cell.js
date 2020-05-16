class Cell {
    constructor(state) {
        this.current_state = state;
        this.next_state = state;
    }

    update() {
        this.current_state = this.next_state;
    }
}