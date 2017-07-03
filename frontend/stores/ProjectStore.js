import {action, computed, observable} from "mobx";
import SplitBox from 'models/panels/SplitBox';
import CodeEditorPanel from 'models/panels/CodeEditorPanel';

export default class ProjectStore {
    @observable 
    layoutModel = new SplitBox(true, 50,[
        new SplitBox(true,20, [
            new SplitBox(false, 41, [
                // TODO: File
                new CodeEditorPanel(null, 'aaa'),
                new CodeEditorPanel(null, 'bbb')
            ]),
            new CodeEditorPanel(null, 'aaa')
        ]),
        new CodeEditorPanel(null, 'ccc')
    ]);
}
