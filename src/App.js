import Breadcrumb from "./components/BreadCrumb.js";
import ImageView from "./components/ImageView.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default class App {
    constructor($target) {
        this.state = {
            items: [],
            path: [{
                name: "root",
                id: 0
            }],
            currImage: null
        };

        this.breadCrumb = new Breadcrumb({ 
            $target,
            initialState: this.state.path
        });

        this.nodes = new Nodes({
            $target,
            initialState: this.state.items,
            onClick: async (target) => {
                if (target.dataset.type === "DIRECTORY") {
                    const name = target.innerText;
                    const id = target.dataset.id;
                    
                    try {
                        const data = await request(id);
                        const path = [...this.state.path];
                        if (data) {
                            path.push({name, id});

                            this.setState({
                                ...this.state,
                                items: data,
                                path
                            });
                        }
                    } catch (e) {
                        throw new Error(`에러가 발생했습니다. ${e}`);
                    }
                } else if(target.dataset.type === "FILE") {
                    this.setState({
                        ...this.state,
                        currImage: target.dataset.src
                    });
                } else {}
            }
        });

        this.imageView = new ImageView({ 
            $target,
            initialState: this.state.currImage,
            onClick: () => {
                this.setState({
                    ...this.state,
                    currImage: null
                });
            }
        });

        const body = document.querySelector("body");
        body.addEventListener("keyup", e => {
            if(e.key === "Escape" && this.state.currImage) {
                this.setState({
                    ...this.state,
                    currImage: null
                });
            }
        });

        this.init();
    }

    setState(nextState) {
        this.state = nextState;
        this.breadCrumb.setState(this.state.path);
        this.nodes.setState(this.state.items);
        this.imageView.setState(this.state.currImage);
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