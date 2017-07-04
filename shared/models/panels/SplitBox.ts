import Panel from "./Panel";
import {observable} from 'mobx';

export default class SplitBox {
    vertical: boolean;
    @observable size: number;
    nodes: Array<SplitBox|Panel>;
    @observable u:number=0;
    constructor(vertical,size,nodes){
        this.vertical=vertical;
        this.size=size;
        if(nodes.length!==2)
            throw new Error('SplitBox can have only 2 nodes!');
        this.nodes=nodes;
    }
}