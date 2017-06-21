import {action, computed, observable} from "mobx";
import Notification from "../../shared/Models/Notification";

const NOTIFICATION_TIMEOUT = 4000; // 4s
const NOTIFICATION_LOG_TIMEOUT = 60 * 1000 * 5; // 5m

export default class NotificationStore {
    @observable notifications = [
        new Notification('red', '123123', 'f6cf')
    ];

    @action.bound
    addNotification(notification) {
        this.notifications.push(notification);
    }

    @action.bound
    updateNotifications() {
        let currentTime = Date.now();
        this.notifications.forEach(notification => {
            // Expired log
            if (notification.startTime + NOTIFICATION_LOG_TIMEOUT < currentTime) {
                if (!this.notifications.remove(notification))
                    console.error('Error on removal of expired log notification!');
                return;
            }
            // Expired notifications
            if (!notification.onlyLog && notification.startTime + NOTIFICATION_TIMEOUT < currentTime) {
                notification.onlyLog = true;
            }
        });
    }
}
