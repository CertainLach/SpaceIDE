import React, {Component} from 'react';
import {
    chatMessage,
    content
} from "styles/mainUi.less";

export default class PlainMessage extends Component {
    render(){
        let {photo,author,time,text}=this.props;
        return <div className={chatMessage}>
            <img src={photo}/>
            <div className={content}>
                {/*TODO: Time (moment.js?)*/}
                <span>{author}, TODO</span>
                <p>{text}</p>
            </div>
        </div>
    }
}