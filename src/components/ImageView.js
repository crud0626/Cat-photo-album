export default class ImageView {
    constructor($target) {
        this.modal = document.createElement("div");
        this.modal.className = "Modal ImageViewer";

        $target.appendChild(this.modal);

        this.render();
    }

    render() {
        this.modal.innerHTML = `
            <div class="content">
            <img src="./assets/sample_image.jpg">
        `;
    }
}