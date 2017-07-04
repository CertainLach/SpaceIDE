import {action, computed, observable} from "mobx";

const NOTIFICATION_TIMEOUT = 4000; // 4s
const NOTIFICATION_LOG_TIMEOUT = 60 * 1000 * 5; // 5m

export default class NotificationStore {
    @observable notifications = [];

    @action.bound
    addNotification(notification) {
        this.notifications.push(notification);
        setTimeout(()=>{
            this.expireNotification(notification);
        },NOTIFICATION_TIMEOUT);
        setTimeout(()=>{
            this.expireLogNotification(notification);
        },NOTIFICATION_LOG_TIMEOUT)
    }

    @action.bound
    expireNotification(notification){
        notification.onlyLog=true;
    }
    @action.bound
    expireLogNotification(notification){
        if (!this.notifications.remove(notification))
            console.error('Error on removal of expired log notification!');
    }
}
