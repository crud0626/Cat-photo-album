export default class Loading {
    constructor({ $target, initialState }) {
        this.state = initialState;
        this.modal = document.createElement("div");
        this.modal.className = "Modal Loading";
        this.modal.innerHTML = `
            <div class="content"><img src="./assets/nyan-cat.gif"></div>
        `;

        $target.appendChild(this.modal);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.state 
        ? this.modal.style.visibility = "visible"
        : this.modal.style.visibility = "hidden";
    }
}