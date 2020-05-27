class Cell {
    constructor(state) {
        this.last_state = state;
        this.current_state = state;
        this.next_state = state;
    }

    set(state) {
        this.next_state = (state + this.last_state) % 2;
        this.last_state = this.current_state;
    }

    update() {
        this.current_state = this.next_state;
    }
}