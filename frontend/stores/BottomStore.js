import {action, computed, observable} from "mobx";

export default class BottomStore {
    @observable fileBrowserOpened = false;
    @observable selectedFile = null;
    @observable files = [];

    @action.bound
    openFileBrowser() {
        this.fileBrowserOpened = true;
    }

    @action.bound
    closeFileBrowser() {
        this.fileBrowserOpened = false;
    }

    @action.bound
    toggleFileBrowser() {
        this.fileBrowserOpened = !this.fileBrowserOpened;
    }

    @action.bound
    selectFile(name) {
        this.selectedFile = name;
    }
}
