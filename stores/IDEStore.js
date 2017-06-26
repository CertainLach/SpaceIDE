import {action, computed, observable} from "mobx";
import autobind from 'autobind-decorator'

export default class IDEStore {
    @observable logShow = false;

    @action
    @autobind
    toggleLogShow() {
        this.logShow = !this.logShow;
    }
}
