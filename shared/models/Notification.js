import {observable} from "mobx";
let notificationId=0;
export default class Notification{
    author;
    text;
    color;
    @observable onlyLog=false;
    startTime;
    constructor(color,text,author=undefined){
        this.key=notificationId++;
        this.color=color;
        this.text=text;
        this.startTime=Date.now();
        this.author=author;
    }
}