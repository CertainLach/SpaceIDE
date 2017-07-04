import {action, computed, observable} from "mobx";

export default class AppStore {
    @observable appName = 'SpaceIDE';
    @observable pageName = 'Unnamed';

    @computed
    get title() {
        return `${this.appName} - ${this.pageName}`;
    }

    @action
    setPage(name = 'Unnamed') {
        this.pageName = name;
    }
}
