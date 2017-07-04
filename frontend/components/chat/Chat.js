import React, {Component} from "react";
import {
    chat,
    chatContents,
    chatHelp,
    chatInput,
    chatMessageList
} from "styles/mainUi.less";
import ChatBottomPanel from "./bottom/ChatBottomPanel";
import PlainMessage from "./messageTypes/PlainMessage";

export default class Chat extends Component {
    render() {
        return <div className={chat}>
            <div className={chatContents}>
                <div className={chatMessageList}>
                    <PlainMessage
                        photo={'https://pp.userapi.com/c631525/v631525415/43d9e/7xN9U7nTl0E.jpg'}
                        author={'F6CF'}
                        time={Date.now()}
                        text={'Hello world'}
                    />
                </div>
                <input className={chatInput} placeholder="Message"/>
                <ChatBottomPanel/>
            </div>
        </div>
    }
}