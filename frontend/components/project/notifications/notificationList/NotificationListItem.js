import React, {Component} from "react";
import {notificationItem} from "styles/mainUi.less";

export default class NotificationItem extends Component {
    render() {
        return <div className={notificationItem} style={{borderTopColor: this.props.notification.color}}>
            {this.props.notification.author ? <span>{this.props.notification.author}</span> : undefined}
            {this.props.notification.text}
        </div>
    }
}