export default class File{
    userCount:number;
    path:string;
    size:number;
    todoCount:number;
    fixmeCount:number;
    constructor(path:string,size:number,todoCount:number,fixmeCount:number){
        this.path=path;
        this.size=size;
        this.todoCount=todoCount;
        this.fixmeCount=fixmeCount;
    }
}