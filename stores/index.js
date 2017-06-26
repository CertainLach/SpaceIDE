// Import
import AppStore from "./AppStore";
import BottomStore from "./BottomStore";
import NotificationStore from "./NotificationStore";
import {toJS} from "mobx";
import IDEStore from "./IDEStore";
import ProjectStore from "./ProjectStore";

// Real store
export function createStore() {
    // This stores will be provided to all components
    return ({
        app: new AppStore(),
        bottom: new BottomStore(),
        notification: new NotificationStore(),
        ide: new IDEStore(),
        project: new ProjectStore()
    });
}

export function createClientStore(realStore) {
    if (!window.__SERVER_STORE__) {
        console.error('Store is already created, crash possible.');
    } else {
        if (window.__SERVER_STORE__.stubbedState) {
            console.warn('Starting with stubbed app state!');
        } else {
            for (const miniStoreName in window.__SERVER_STORE__) {
                if (!window.__SERVER_STORE__.hasOwnProperty(miniStoreName)) {
                    console.warn('Skipped server ministore: ' + miniStoreName);
                    continue;
                }
                const miniStoreClient = realStore[miniStoreName];
                const miniStoreServer = window.__SERVER_STORE__[miniStoreName];
                for (const miniStoreKey in miniStoreServer) {
                    if (!miniStoreServer.hasOwnProperty(miniStoreKey)) {
                        console.warn('Skipped server ministore key: ' + miniStoreKey);
                        continue;
                    }
                    miniStoreClient[miniStoreKey] = miniStoreServer[miniStoreKey];
                }
            }
        }
        delete window.__SERVER_STORE__;
    }
    return realStore;
}

export function createServerStore(realStore) {
    const tempStore = {};
    for (const miniStoreName in realStore) {
        // No checking is needed
        tempStore[miniStoreName] = toJS(realStore[miniStoreName], false);
    }
    return tempStore;
}