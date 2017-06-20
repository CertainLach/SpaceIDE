import React,{Component} from 'react';
import {
    bottomPanel,
    bottom,
    bottomLaunchButtons,
    filebrowserButton,
    fileHistory,
    fileHistoryItem,
    commitButton,
    launchButton,
    bottomLeft
} from '../../../styles/mainUi.less';
import FileBrowser from "./fileBrowser/FileBrowser";

import{
    inject,
    observer
} from 'mobx-react';

@inject('bottom')
@observer
export default class ProjectBottomPanel extends Component {
    render() {
        return <div className={bottom}>
            <FileBrowser/>
            <div id={bottomPanel}>
                {/*To left*/}
                <div id={bottomLeft}>
                    <div id={filebrowserButton} onClick={this.props.bottom.toggleFileBrowser}/>
                    <div id={fileHistory}>
                        <div className={fileHistoryItem}>None</div>
                        <div className={fileHistoryItem}>None</div>
                        <div className={fileHistoryItem}>None</div>
                        <div className={fileHistoryItem}>None</div>
                    </div>
                </div>
                {/*To right*/}
                <div id={bottomLaunchButtons}>
                    <div id={commitButton}>COMMIT</div>
                    <div id={launchButton}>DEPLOY</div>
                </div>
            </div>
        </div>
    }
}