export default class Loading {
    constructor({ $app, initialState }) {
        this.state = initialState;
        
        this.target = document.createElement("div");
        this.target.className = "Modal Loading";
        this.target.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;

        $app.appendChild(this.target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.state 
        ? this.target.style.visibility = "visible"
        : this.target.style.visibility = "hidden";
    }
}