import React, {Component} from "react";
import {notifications} from "styles/mainUi.less";
import {inject, observer} from "mobx-react";
import NotificationItem from "./NotificationListItem";

const MAX_NOTIFICATION_LIST_NOTIFICATIONS = 4;

@inject("notification")
@observer
export default class NotificationList extends Component {
    componentDidMount() {
        // TODO: Move to autoruns
        this.intervalId = setInterval(() => {
            this.props.notification.updateNotifications()
        }, 50);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return <div id={notifications}>
            {this.props.notification.notifications.filter(notification => !notification.onlyLog).slice(1).slice(-MAX_NOTIFICATION_LIST_NOTIFICATIONS).map(not =>
                <NotificationItem key={not.key} notification={not}/>)}
        </div>
    }
}