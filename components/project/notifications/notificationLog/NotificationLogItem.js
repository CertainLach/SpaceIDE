import React,{Component} from 'react';
import {logItem,logItemTop} from '../../../../styles/mainUi.less';

export default class NotificationLogItem extends Component{
    render(){
        return <div className={logItem}>
            <div className={logItemTop} style={{
                borderTopColor:'red'
            }}/>
            {this.props.notification.author?<span>{this.props.notification.author}</span>:undefined}
            {this.props.notification.text}
        </div>
    }
}