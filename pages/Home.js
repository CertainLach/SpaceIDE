import React,{Component} from 'react';
import FileBrowser from "../components/project/bottom/fileBrowser/FileBrowser";
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
import{
    inject,
    observer
} from 'mobx-react';
import ProjectPanelLayout from "../components/project/panels/ProjectPanelLayout";
import NotificationList from '../components/project/notifications/notificationList/NotificationList';
import NotificationLog from '../components/project/notifications/notificationLog/NotificationLog';
import ProjectBottomPanel from "../components/project/bottom/ProjectBottomPanel";
import Chat from "../components/chat/Chat";

const FileBrowserMenuItem = props=><div onClick={props.onClick} className={fileBrowserMenuItem}>
    {props.title}
</div>;

@inject('app','ide')
@observer
export default class Home extends Component {
    componentWillMount(){
        // TODO
        this.props.app.setPage('ProjectName');
    }
    render() {
        return <div style={{height:'100%',width:'100%'}}>
            <div style={{display:'flex'}}>
                <div style={{width:'20%',display:'inline'}}>
                    <Chat/>
                </div>
                <div style={{width:'80%',display:'inline'}}>
                    <ProjectPanelLayout/>
                    <ProjectBottomPanel/>
                </div>
            </div>
        </div>
    }
}