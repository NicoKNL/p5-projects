class Cell {
    constructor(state) {
        this.current_state = state;
        this.next_state = state;
        this.alive = false;
    }

    set(state) {
        this.next_state = state;
        this.alive = true;
    }

    update() {
        this.current_state = this.next_state;
    }
}