export default class Breadcrumb {
    constructor({ $app, initialState, onClick }) {
        this.state = initialState;

        this.target = document.createElement("nav");
        this.target.className = "Breadcrumb";
        this.target.addEventListener("click", e => {
            if(!e.target.matches(".Breadcrumb")) {
                onClick(e.target);
            }
        })
        
        $app.appendChild(this.target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.target.innerHTML = `
            ${this.state.map(({name, id}, index) => {
                return `<div data-id=${id} data-index=${index}>${name}</div>`;
            }).join("")}
        `;
    }
}