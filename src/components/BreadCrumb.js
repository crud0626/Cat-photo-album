export default class Breadcrumb {
    constructor({ $target, initialState }) {
        this.state = initialState;

        this.nav = document.createElement("nav");
        this.nav.className = "Breadcrumb";
        
        $target.appendChild(this.nav);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.nav.innerHTML = `
            ${this.state.map(({name, id}) => {
                return `<div data-id=${id}>${name}</div>`;
            }).join("")}
        `;
    }
}