import React, {Component} from "react";
import {
    bottom,
    chat,
    chatBottomItem,
    chatBottomPanel,
    chatContents,
    chatHelp,
    chatInput,
    chatMessage,
    chatMessageList,
    circle,
    content
} from "../../styles/mainUi.less";

export default class Chat extends Component {
    render() {
        return <div className={chat}>
            <div className={chatContents}>
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
                    </div>
                </div>
                <input className={chatInput} placeholder="Message"/>
                <div className={bottom}>
                    <div id={chatHelp}>
                        Chat help
                    </div>
                    <div id={chatBottomPanel}>
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
            </div>
        </div>
    }
}