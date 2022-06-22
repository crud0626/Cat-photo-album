export default class Breadcrumb {
    constructor({ $target, initialState, onClick }) {
        this.state = initialState;

        this.nav = document.createElement("nav");
        this.nav.className = "Breadcrumb";
        this.nav.addEventListener("click", e => {
            if(!e.target.matches(".Breadcrumb")) {
                onClick(e.target);
            }
        })
        
        $target.appendChild(this.nav);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.nav.innerHTML = `
            ${this.state.map(({name, id}, index) => {
                return `<div data-id=${id} data-index=${index}>${name}</div>`;
            }).join("")}
        `;
    }
}