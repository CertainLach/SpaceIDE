import {
    observable,
    computed,
    action
} from 'mobx';
import File from "../../shared/Models/File";

export default class BottomStore {
    @observable fileBrowserOpened = false;
    @observable selectedFile = null;
    @observable files = [new File('stores/AppStore1.js',2032,1,52),new File('stores/App3Store.js',2032,1,52),new File('stores/App2Store.js',2032,1,52),new File('stores/4AppStore.js',2032,1,52),new File('stores/AppSto5re.js',2032,1,52),new File('stores/AppSto7re.js',2032,1,52),new File('stores/AppS6tore.js',2032,1,52),new File('stoares/AppStore.js',2032,1,52),new File('storess/AppStore.js',2032,1,52),new File('storecs/AppStore.js',2032,1,52),new File('stores/AppbStore.js',2032,1,52),new File('stoqres/AppStore.js',2032,1,52),new File('storeas/AppStore.js',2032,1,52),new File('stores/ApnpStore.js',2032,1,52),new File('stohfres/AppStore.js',2032,1,52)];
    @action.bound openFileBrowser(){
        this.fileBrowserOpened=true;
    }
    @action.bound closeFileBrowser(){
        this.fileBrowserOpened=false;
    }
    @action.bound toggleFileBrowser(){
        this.fileBrowserOpened=!this.fileBrowserOpened;
    }
    @action.bound selectFile(name){
        this.selectedFile=name;
    }
}
