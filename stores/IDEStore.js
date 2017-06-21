import {
    observable,
    computed,
    action
} from 'mobx';

export default class IDEStore {
    @observable logShow = false;
    @action.bound toggleLogShow(){
        this.logShow=!this.logShow;
    }
}
