export default class Nodes {
    constructor({ $target, initialState, onClick, onBackClick }) {
        this.state = initialState;
        this.nodes = document.createElement("div");
        this.nodes.className = "Nodes";
        this.nodes.addEventListener("click", e => {
            const target = e.target.closest(".Node");
            if (target.dataset.type === "PREVBTN") {
                onBackClick();
            } else {
                onClick(target);
            }
        });
        
        $target.appendChild(this.nodes);

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

        this.nodes.innerHTML = this.state.isRoot ? nodes : `<div data-type="PREVBTN" class="Node"><img src="./assets/prev.png"></div>${nodes}`;
    }
}