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
import NotificationList from '../components/project/notifications/NotificationList';

const FileBrowserMenuItem = props=><div onClick={props.onClick} className={fileBrowserMenuItem}>
    {props.title}
</div>;

@inject('app','bottom')
@observer
export default class Home extends Component {
    componentWillMount(){
        this.props.app.setPage('Главная');
    }
    render() {
        return <div style={{height:'100%',width:'100%'}}>
            <NotificationList/>
            <ProjectPanelLayout/>
            <div className={bottom}>
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
        </div>
    }
}