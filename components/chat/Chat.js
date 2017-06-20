import React,{Component} from 'react';
import {
    bottom,chatInput,chat,chatBottom,chatBottomItem,circle,chatMessageList,chatMessage,content
} from '../../styles/mainUi.less';
import ChatBottomPanel from "./bottom/ChatBottomPanel";

export default class Chat extends Component {
    render() {
        return <div className={chat} style={{height:'100%',width:'100%'}}>
            <div className={chatMessageList}>
                <div className={chatMessage}>
                    <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                    <div className={content}>
                        <span>F6CF, 22 hours ago</span>
                        <p>Hello world</p>
                    </div>
                </div>
                <div className={chatMessage}>
                    <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                    <div className={content}>
                        <span>F6CF, 22 hours ago</span>
                        <p>Hello world<br/>
                            sda<br/>
                            asdas<br/>
                            asd<br/>
                            asd</p>
                    </div>
                </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div><div className={chatMessage}>
                <img src="https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg"/>
                <div className={content}>
                    <span>F6CF, 22 hours ago</span>
                    <p>Hello world<br/>
                        sda<br/>
                        asdas<br/>
                        asd<br/>
                        asd</p>
                </div>
            </div>
            </div>
            <input className={chatInput} placeholder="Message"/>
            <div className={bottom+' '+chatBottom}>
                <div className={chatBottomItem}>
                    <div className={circle}/>
                </div>
                <div className={chatBottomItem}>
                    <div className={circle}/>
                </div>
                <div className={chatBottomItem}>
                    <div className={circle}/>
                </div>
                <div className={chatBottomItem}>
                    <div className={circle}/>
                </div>
            </div>
        </div>
    }
}