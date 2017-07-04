import React, {Component} from "react";
import {
    bottom,
    chatBottomItem,
    chatBottomPanel,
    chatHelp,
    circle
} from "styles/mainUi.less";

export default class ChatBottomPanel extends Component {
    render() {
        return <div className={bottom}>
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
    }
}