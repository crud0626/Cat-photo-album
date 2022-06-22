export default class Nodes {
    constructor({ $target, initialState, onClick }) {
        this.state = initialState;
        this.nodes = document.createElement("div");
        this.nodes.className = "Nodes";
        this.nodes.addEventListener("click", e => {
            const target = e.target.closest(".Node");
            if (target) {
                onClick(target);
            };
        });
        
        $target.appendChild(this.nodes);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        this.nodes.innerHTML = `
            ${this.state.map(({id, name, type, filePath}) => {
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
    }
}

{/* <div class="Node">
<img src="./assets/prev.png">
</div>
<div class="Node">
<img src="./assets/directory.png">
<div>2021/04</div>
</div>
<div class="Node">
<img src="./assets/file.png">
<div>하품하는 사진</div>
</div> */}