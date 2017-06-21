import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {
    active,
    bottom,
    bottomLaunchButtons,
    bottomLeft,
    bottomPanel,
    commitButton,
    container,
    filebrowserButton,
    fileHistory,
    fileHistoryItem,
    ideTopBar,
    launchButton,
    top,
    topMenu,
    topMenuItem,
    topMenuItemOpen
} from "../styles/mainUi.less";
import NotificationLog from "../components/project/notifications/notificationLog/NotificationLog";
import NotificationList from "../components/project/notifications/notificationList/NotificationList";

@inject('ide')
@observer
export default class PageWrapper extends Component {
    render() {
        return <div id={container}>
            <div className={ideTopBar}>
                <div className={topMenu}>
                    <div className={topMenuItem}>
                        <span>C</span>hat
                    </div>
                    <div className={topMenuItem + (this.props.ide.logShow ? ' ' + active : '')}
                         onClick={this.props.ide.toggleLogShow}>
                        <span>L</span>og
                    </div>
                </div>
            </div>
            {this.props.ide.logShow ? <NotificationLog/> : <NotificationList/>}
            {this.props.children}
        </div>
    }
}
