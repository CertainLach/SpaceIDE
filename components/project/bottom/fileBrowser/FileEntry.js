import {
    fileEntry,
    fileEntryDir,
    fileEntryUsers,
    fileEntrySize,
    fileEntryTD,
    fileEntryFM,
} from '../../../../styles/mainUi.less';
import React from 'react';
import {observer,inject} from 'mobx-react';
import * as filesize from 'filesize';

export default inject('bottom')(observer(props=> {
    let file=props.file;
    let dir=file.path.substr(0,file.path.lastIndexOf('/')+1);
    let fileName=file.path.substr(file.path.lastIndexOf('/')+1);
    return <div className={fileEntry} onContextMenu={()=>props.bottom.selectFile(file.path)}>
        <div className={fileEntryDir} title="File dir">{dir}</div>
        <div title="File name">{fileName}</div>
        <div className={fileEntryUsers} title="Users in file">{file.userCount}</div>
        <div className={fileEntrySize} title="File size">{filesize(file.size)}</div>
        <div className={fileEntryTD} title="TODO Count" style={{
            height: Math.min(16, file.todoCount)
        }}/>
        <div className={fileEntryFM} title="FIXME Count" style={{
            height: Math.min(16, file.fixmeCount)
        }}/>
    </div>
}));
