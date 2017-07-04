import {inject, observer} from "mobx-react";
import {reaction} from 'mobx';
import ace from "brace-mod";
import 'brace-mod/mode-custom/prettydoc';
import 'brace-mod/theme-custom/prettydoc';
import "brace-mod/ext-custom/freespace";
import "brace-mod/ext-custom/gist";
import "brace-mod/ext/linking";
import "brace-mod/theme/chaos";
import copy from 'copy-to-clipboard';


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
                        files: {[this.props.model.fileName]: {"content": e.text}},
                        public: true
                    }),
                    contentType: "application/json"
                }).then(response => response.json()).then(data => {
                    e.cb();
                    if(!data.html_url){
                        this.props.notification.addNotification(new Notification('red','Cannot create gist!','GIST'));
                    }else {
                        copy(data.html_url, {
                            debug: true,
                            message: 'Gist url (Press #{key} to copy):',
                        });
                        this.props.notification.addNotification(new Notification('yellow', 'Link copied to your clipboard', 'GIST'));
                    }
                }).catch(e=>{
                    this.props.notification.addNotification(new Notification('red','Cannot create gist!','GIST'));
                })
            }
        });
        reaction(
            ()=>this.props.topModel.u,
            sizes=>this.editor.resize()
        );
    }
    render(){
        console.log('2123');
        console.log(this.props.model);
        return <div ref={e=>this.updateRef(e)} className={aceEditorContainer}>

        </div>
    }
}