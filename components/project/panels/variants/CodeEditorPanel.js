import {inject, observer} from "mobx-react";
import {autorun} from 'mobx';
import ace from "brace-mod";
import 'brace-mod/mode-custom/prettydoc';
import 'brace-mod/theme-custom/prettydoc';
import "brace-mod/ext-custom/freespace";
import "brace-mod/ext-custom/gist";
import "brace-mod/ext/linking";
import "brace-mod/theme/chaos";

import React,{Component} from 'react';
import {
    aceEditorContainer,
    editPane,
    fileStatusBlock,
    splitLR,
    splitTB,
    top,
    topFileName,
    topProjName,
    topStatus
} from "styles/mainUi.less";
import Notification from 'models/Notification';

@inject('notification')
@observer
export default class CodeEditorPanel extends Component{
    updateRef(item) {
        this.refEditor = item;
    }
    componentDidMount() {

        this.editor = ace.edit(this.refEditor);
        this.editor.getSession().setMode(`ace/mode/prettydoc`);
        this.editor.setTheme(`ace/theme/prettydoc`);
        this.editor.setOption('enableFreeSpacePreviews', true);
        this.editor.setOption('enableLinking', true);
        this.editor.setOption('enableGistSharing', true);

        this.editor.on('gistCreated',e=>{
            if(e.text&&e.cb){
                fetch('https://api.github.com/gists', {
                    method: 'post',
                    body: JSON.stringify({
                        description: "Code shared from SpaceIDE",
                        files: {"todo.filename": {"content": e.text}},
                        public: true
                    }),
                    contentType: "application/json"
                }).then(response => response.json()).then(data => {
                    e.cb();
                    this.props.notification.addNotification(new Notification('yellow','Link copied to your clipboard','GIST'))
                    //prompt('Done adding gist, url:', data.html_url);
                });
            }
        });
        console.log(this.editor);
    }
    render(){
        console.log('2123');
        console.log(this.props.model);
        return <div ref={e=>this.updateRef(e)} className={aceEditorContainer}>

        </div>
    }
}