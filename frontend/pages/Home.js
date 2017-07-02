import React, {Component} from "react";
import {
    active,
    bottom,
    bottomLaunchButtons,
    bottomLeft,
    bottomPanel,
    commitButton,
    filebrowserButton,
    fileHistory,
    fileHistoryItem,
    ideTopBar,
    launchButton,
    topMenu,
    topMenuItem,
    topMenuItemOpen
} from "styles/mainUi.less";
import {inject, observer} from "mobx-react";
import ProjectPanelLayout from "project/panels/ProjectPanelLayout";
import ProjectBottomPanel from "project/bottom/ProjectBottomPanel";
import Chat from "chat/Chat";

const FileBrowserMenuItem = props => <div onClick={props.onClick} className={fileBrowserMenuItem}>
    {props.title}
</div>;

@inject('app', 'ide')
@observer
export default class Home extends Component {
    componentWillMount() {
        // TODO: Fetch project name
        this.props.app.setPage('ProjectName');
    }

    render() {
        return <div style={{height: '100%', width: '100%'}}>
            <div style={{display: 'flex'}}>
                <div style={{width: '20%', display: 'inline', position: 'relative'}}>
                    <Chat/>
                </div>
                <div style={{width: '80%', display: 'inline', position: 'relative'}}>
                    <ProjectPanelLayout/>
                    <ProjectBottomPanel/>
                </div>
            </div>
        </div>
    }
}