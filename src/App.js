import Breadcrumb from "./components/BreadCrumb.js";
import ImageView from "./components/ImageView.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default class App {
    constructor($target) {
        this.state = {
            items: []
        };

        this.breadCrumb = new Breadcrumb({ $target });
        this.nodes = new Nodes({
            $target,
            initialState: this.state.items
        });
        this.imageView = new ImageView({ $target });

        this.init();
    }

    setState(nextState) {
        this.state = nextState;
        this.nodes.setState(this.state.items);
    }

    init = async () => {
        const data = await request();

        if (data) {
            this.setState({
                ...this.state,
                items: data
            });
        }
    }
}