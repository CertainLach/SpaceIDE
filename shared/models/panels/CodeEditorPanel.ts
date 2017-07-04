import Panel from "./Panel";
import File from '../File';

export default class CodeEditorPanel extends Panel{
    file: File;
    websocket: string;
    constructor(file,websocket){
        super('codeEditor');
        this.file=file;
        this.websocket=websocket;
    }
}