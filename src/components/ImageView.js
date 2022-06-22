const BASE_URL = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageView {
    constructor({ $target, initialState, onClick }) {
        this.state = initialState;
        this.modal = document.createElement("div");
        this.modal.className = "Modal ImageViewer";
        this.modal.addEventListener("click", e => {
            if (e.target.matches(".ImageViewer")) {
                onClick(e.target);
            }
        });

        $target.appendChild(this.modal);

        this.render();
    }

    setState(nextState) {
        this.state = nextState;
        this.render();
    }

    render() {
        if (this.state) {
            this.modal.style.visibility = "visible";
            this.modal.innerHTML = `
                <div class="content">
                    <img src=${BASE_URL}${this.state}>
                <div>
            `;
        } else {
            this.modal.style.visibility = "hidden";
        }
    }
}