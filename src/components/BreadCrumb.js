export default class Breadcrumb {
    constructor($target) {
        this.nav = document.createElement("nav");
        this.nav.className = "Breadcrumb";
        
        $target.appendChild(this.nav);

        this.render();
    }

    render() {
        this.nav.innerHTML = `
            <div>root</div>
            <div>노란고양이</div>
        `;
    }
}