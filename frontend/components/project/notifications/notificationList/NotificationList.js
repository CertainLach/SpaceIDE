import React, {Component} from "react";
import {notifications} from "styles/mainUi.less";
import {inject, observer} from "mobx-react";
import NotificationItem from "./NotificationListItem";

@inject("notification")
@observer
export default class NotificationList extends Component {
    render() {
        return <div id={notifications}>
            {this.props.notification.notifications.filter(notification => !notification.onlyLog).map(not => <NotificationItem key={not.key} notification={not}/>)}
        </div>
    }
}