import {
    observable,
    computed,
    action
} from 'mobx';
import Notification from "../../shared/Models/Notification";

const MAX_NOTIFICATION_COUNT=10;
const NOTIFICATION_TIMEOUT=3800;

export default class NotificationStore {
    @observable notifications = [
        new Notification('red','123123','f6cf')
    ];
    @action.bound addNotification(notification){
        if(this.notifications.length+1>MAX_NOTIFICATION_COUNT)
            this.notifications.remove(this.notifications[0]); // Remove first (=oldest)
        this.notifications.push(notification);
    }
    @action.bound updateNotifications(){
        let a=Date.now();
        let oldLength=this.notifications.length;
        this.notifications.forEach(notification=>{
            // Expired
            if(notification.startTime+NOTIFICATION_TIMEOUT<a)
                if(!this.notifications.remove(notification))
                    console.error('Error on removal of expired notification!');
        });
        let newLength=this.notifications.length;
        //console.log(`Removed ${oldLength-newLength} items`);
    }
}
