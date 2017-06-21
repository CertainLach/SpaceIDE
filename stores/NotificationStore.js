import {
    observable,
    computed,
    action
} from 'mobx';
import Notification from "../../shared/Models/Notification";

//const MAX_NOTIFICATION_COUNT=10;
const NOTIFICATION_TIMEOUT=4000; // 4 sec
const NOTIFICATION_LOG_TIMEOUT=60*1000*5; // 5 minutest

export default class NotificationStore {
    @observable notifications = [
        new Notification('red','123123','f6cf')
    ];
    // @action.bound getNotificationPanelNotifications(){
    //     console.log('panel');
    //     return this.notifications;
    // }
    // @action.bound getNotificationLogNotifications(){
    //     console.log('log');
    //     return this.notifications;
    // }
    @action.bound addNotification(notification){
        // if(this.notifications.length+1>MAX_NOTIFICATION_COUNT)
        //     // TODO: Improve speed (every item is processed, even log)
        //     this.notifications.slice(-MAX_NOTIFICATION_COUNT+1).forEach(notification=>{
        //         notification.onlyLog=true
        //     });
        this.notifications.push(notification);
    }
    @action.bound updateNotifications(){
        let a=Date.now();
        let oldLength=this.notifications.length;
        this.notifications.forEach(notification=> {
            // Expired log
            if (notification.startTime + NOTIFICATION_LOG_TIMEOUT < a) {
                if (!this.notifications.remove(notification))
                    console.error('Error on removal of expired log notification!');
                console.log('LOG_EXP ', notification, a);
                return;
            }
            // Expired notifications
            if (!notification.onlyLog && notification.startTime + NOTIFICATION_TIMEOUT < a) {
                notification.onlyLog = true;
                console.log('NOTIF_EXP ',notification,a);
            }
        });
        let newLength=this.notifications.length;
        //console.log(`Removed ${oldLength-newLength} items`);
    }
}
