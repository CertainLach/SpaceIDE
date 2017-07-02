import {Panel} from "./Panel";
import File from '../File';

export default class CodeEditorPanel extends Panel{
    file: File;
    constructor(file){
        super('codeEditor');
        this.file=file;
    }
}