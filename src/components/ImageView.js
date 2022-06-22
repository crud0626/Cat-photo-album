const BASE_URL = "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

export default class ImageView {
    constructor({ $app, initialState, onClick }) {
        this.state = initialState;
        
        this.target = document.createElement("div");
        this.target.className = "Modal ImageViewer";
        this.target.addEventListener("click", e => {
            if (e.target.matches(".ImageViewer")) {
                onClick(e.target);
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
        if (this.state) {
            this.target.style.visibility = "visible";
            this.target.innerHTML = `
                <div class="content">
                    <img src=${BASE_URL}${this.state}>
                <div>
            `;
        } else {
            this.target.style.visibility = "hidden";
        }
    }
}