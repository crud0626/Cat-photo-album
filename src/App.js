import Breadcrumb from "./components/BreadCrumb.js";
import ImageView from "./components/ImageView.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default class App {
    constructor($target) {

        this.breadCrumb = new Breadcrumb($target);
        this.nodes = new Nodes($target);
        this.imageView = new ImageView($target);
    }
}