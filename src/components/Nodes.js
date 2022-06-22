const PREVBTN_TEMPLATE = `<div data-type="PREVBTN" class="Node"><img src="./assets/prev.png"></div>`;

export default class Nodes {
    constructor({ $app, initialState, onClick, onBackClick }) {
        this.state = initialState;

        this.target = document.createElement("div");
        this.target.className = "Nodes";
        this.target.addEventListener("click", e => {
            const target = e.target.closest(".Node");

            if (target) {
                target.dataset.type === "PREVBTN" 
                ? onBackClick() 
                : onClick(target);
            }
        });
        
        $app.appendChild(this.target);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        const nodes = `
            ${this.state.items.map(({id, name, type, filePath}) => {
                if (type === "DIRECTORY") {
                    return `
                        <div data-id=${id} data-type=${type} class="Node">
                            <img src="./assets/directory.png">
                            <div>${name}</div>
                        </div>
                    `;
                } else {
                    return `
                        <div data-id=${id} data-type=${type} data-src=${filePath} class="Node">
                            <img src="./assets/file.png">
                        <div>${name}</div>
                    `;
                }
            }).join("")}
        `;

        this.target.innerHTML = this.state.isRoot ? nodes : `${PREVBTN_TEMPLATE}${nodes}`;
    }
}