import {Panel} from "./Panel";

export default class SplitBox {
    vertical: boolean;
    size: number;
    nodes: Array<SplitBox|Panel>;
    constructor(vertical,size,nodes){
        this.vertical=vertical;
        this.size=size;
        if(nodes.length!==2)
            throw new Error('SplitBox can have only 2 nodes!');
        this.nodes=nodes;
    }
}