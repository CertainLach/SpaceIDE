import React, {Component} from "react";
import {logWindow, logWindowCaret, logWindowContent} from "styles/mainUi.less";
import {inject, observer} from "mobx-react";
import NotificationLogItem from "./NotificationLogItem";
import ReactDOM from "react-dom";

@inject("notification")
@observer
export default class NotificationLog extends Component {
    messagesContainer = null;

    render() {
        return <div id={logWindow}>
            {/*<div id={logWindowCaret}/>*/}
            <div id={logWindowContent} ref={(el) => {
                this.messagesContainer = el;
            }}>
                {this.props.notification.notifications.map(not => <NotificationLogItem key={not.key}
                                                                                       notification={not}/>)}
            </div>
        </div>
    }

    scrollToBottom() {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
}