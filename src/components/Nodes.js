export default class Nodes {
    constructor($target) {
        this.nodes = document.createElement("div");
        this.nodes.className = "Nodes";
        
        $target.appendChild(this.nodes);

        this.render();
    }

    render() {
        this.nodes.innerHTML = `
            <div class="Node">
                <img src="./assets/prev.png">
            </div>
            <div class="Node">
                <img src="./assets/directory.png">
                <div>2021/04</div>
            </div>
            <div class="Node">
                <img src="./assets/file.png">
                <div>하품하는 사진</div>
            </div>
        `;
    }
}

