import {action, computed, observable} from "mobx";

export default class IDEStore {
    @observable logShow = false;

    @action.bound
    toggleLogShow() {
        this.logShow = !this.logShow;
    }
}
