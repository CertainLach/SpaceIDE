import {action, computed, observable} from "mobx";
import autobind from 'autobind-decorator'

export default class BottomStore {
    @observable fileBrowserOpened = false;
    @observable selectedFile = null;
    @observable files = [];

    @action
    @autobind
    openFileBrowser() {
        this.fileBrowserOpened = true;
    }

    @action
    @autobind
    closeFileBrowser() {
        this.fileBrowserOpened = false;
    }

    @action
    @autobind
    toggleFileBrowser() {
        this.fileBrowserOpened = !this.fileBrowserOpened;
    }

    @action
    @autobind
    selectFile(name) {
        this.selectedFile = name;
    }
}
