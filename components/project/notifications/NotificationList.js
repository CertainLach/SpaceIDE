import React,{Component} from 'react';
import {notifications} from '../../../styles/mainUi.less';
import {inject, observer} from 'mobx-react';
import NotificationItem from "./NotificationItem";
import Notification from '../../../../shared/Models/Notification';

@inject("notification")
@observer
export default class NotificationList extends Component{
    componentDidMount() {
        // Test function
        setInterval(()=>{
            this.props.notification.addNotification(new Notification('green','123','f6cf'));
        },1000);
        this.intervalId = setInterval(()=>{
            this.props.notification.updateNotifications()
        }, 50);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    render(){
        let key=0;
        return <div id={notifications}>
            {this.props.notification.notifications.map(not=><NotificationItem key={not.key} notification={not}/>)}
        </div>
    }
}