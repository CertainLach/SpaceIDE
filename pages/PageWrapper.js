import React,{Component} from 'react';
import {observer,inject} from 'mobx-react';
import {container,top} from '../styles/mainUi.less';
import {
    bottomPanel,
    bottom,
    bottomLaunchButtons,
    filebrowserButton,
    fileHistory,
    fileHistoryItem,
    commitButton,
    launchButton,
    bottomLeft,
    ideTopBar,
    topMenu,
    topMenuItem,
    topMenuItemOpen,
    active
} from '../styles/mainUi.less';
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
                    <div className={topMenuItem+(this.props.ide.logShow?' '+active:'')} onClick={this.props.ide.toggleLogShow}>
                        <span>L</span>og
                    </div>
                </div>
            </div>
            {this.props.ide.logShow?<NotificationLog/>:<NotificationList/>}
            {this.props.children}
        </div>
    }
}
