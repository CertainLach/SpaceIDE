import {observable} from 'mobx'; 
export default class Panel {
    panelType:string;
    status:string;
    @observable u:number=0;
    constructor(panelType){
        this.panelType=panelType;
        this.status='idle';
    }
}