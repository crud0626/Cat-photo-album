import Breadcrumb from "./components/BreadCrumb.js";
import ImageView from "./components/ImageView.js";
import Loading from "./components/Loading.js";
import Nodes from "./components/Nodes.js";
import { request } from "./utils/api.js";

export default class App {
    constructor($app) {
        this.state = {
            items: [],
            path: [{
                name: "root",
                id: 0
            }],
            selectedImage: null,
            isRoot: true,
            isLoading: false
        };

        this.cache = {};

        this.breadCrumb = new Breadcrumb({ 
            $app,
            initialState: this.state.path,
            onClick: target => {
                const targetId = target.dataset.id;
                const currentNode = this.state.path[this.state.path.length-1];
                
                if(targetId !== currentNode.id) {
                    const targetIndex = parseInt(target.dataset.index);
                    const path = [...this.state.path];
                    path.splice(targetIndex + 1);

                    this.setState({
                        ...this.state,
                        items: this.cache[targetId],
                        isRoot: path.length === 1 ? true : false,
                        path
                    });
                }
            }
        });

        this.nodes = new Nodes({
            $app,
            initialState: {
                items: this.state.items, 
                isRoot: this.state.isRoot 
            },
            onClick: async (target) => {
                if (target.dataset.type === "DIRECTORY") {
                    this.setState({
                        ...this.state,
                        isLoading: true
                    });

                    const name = target.innerText;
                    const id = target.dataset.id;
                    let data;
                    
                    try {
                        const path = [...this.state.path];
                        path.push({name, id});

                        if (this.cache[id]) {
                            data = this.cache[id]
                        } else {
                            data = await request(id);
                            this.cache[id] = data;
                        }

                        this.setState({
                            ...this.state,
                            items: data,
                            isRoot: false,
                            path
                        });
                    } catch (e) {
                        alert("에러가 발생했습니다.");
                        throw new Error(`에러가 발생했습니다. ${e.message}`);
                    } finally {
                        this.setState({
                            ...this.state,
                            isLoading: false
                        });
                    }
                } else if(target.dataset.type === "FILE") {
                    this.setState({
                        ...this.state,
                        selectedImage: target.dataset.src
                    });
                } else {}
            },
            onBackClick: () => {
                const path = [...this.state.path];
                path.pop();
                const { id } = path[path.length-1];
                this.setState({
                    ...this.state,
                    items: this.cache[id],
                    isRoot: path.length === 1 ? true : false,
                    path
                });
            }
        });

        this.imageView = new ImageView({ 
            $app,
            initialState: this.state.selectedImage,
            onClick: () => {
                this.setState({
                    ...this.state,
                    selectedImage: null
                });
            }
        });

        this.loading = new Loading({ 
            $app, 
            initialState: this.state.isLoading
        });

        const body = document.querySelector("body");
        body.addEventListener("keyup", e => {
            if(e.key === "Escape" && this.state.selectedImage) {
                this.setState({
                    ...this.state,
                    selectedImage: null
                });
            }
        });

        this.init();
    }

    setState(nextState) {
        this.state = nextState;
        this.breadCrumb.setState(this.state.path);
        this.nodes.setState({
            items: this.state.items,
            isRoot: this.state.isRoot
        });
        this.imageView.setState(this.state.selectedImage);
        this.loading.setState(this.state.isLoading);
    }

    init = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });

        try {
            const data = await request();

            if (data) {
                this.setState({
                    ...this.state,
                    items: data,
                    isRoot: true,
                });
                this.cache[0] = data;
            }
        } catch (e) {
            alert("에러가 발생했습니다.");
            throw new Error(`에러가 발생했습니다. ${e.message}`);
        } finally {
            this.setState({
                ...this.state,
                isLoading: false
            });
        }
    }
}