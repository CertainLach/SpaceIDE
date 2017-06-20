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
    bottomLeft
} from '../styles/mainUi.less';
import{
    inject,
    observer
} from 'mobx-react';
import ProjectPanelLayout from "../components/project/panels/ProjectPanelLayout";
import NotificationList from '../components/project/notifications/notificationList/NotificationList';
import NotificationLog from '../components/project/notifications/notificationLog/NotificationLog';
import ProjectBottomPanel from "../components/project/bottom/ProjectBottomPanel";

const FileBrowserMenuItem = props=><div onClick={props.onClick} className={fileBrowserMenuItem}>
    {props.title}
</div>;

@inject('app')
@observer
export default class Home extends Component {
    componentWillMount(){
        this.props.app.setPage('Главная');
    }
    render() {
        return <div style={{height:'100%',width:'100%'}}>
            <NotificationList/>
            <NotificationLog/>
            <ProjectPanelLayout/>
            <ProjectBottomPanel/>
        </div>
    }
}