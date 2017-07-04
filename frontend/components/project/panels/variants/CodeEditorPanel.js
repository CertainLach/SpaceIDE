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
import {diff_match_patch as DiffMatchPatch} from 'diff_match_patch';
import {NoOp,Insert,Delete,Split,Recon,ReconSegment,DoRequest,UndoRequest,RedoRequest,Vector,State,Segment,SegmentBuffer} from 'Operational';
import {packet} from 'protocol/collabText.pds';

console.log(packet);

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
        this.editor.getSession().setFoldStyle('markbeginend');
        // On link hover
        this.editor.on("linkHover", (data) => {
            let el = this.editor.container;
            if (data && data.token && data.token.type === "link")
                el.style.cursor = 'pointer';
            else
                el.style.cursor = 'text';
        });
        // On link click
        this.editor.on("linkClick", (data) => {
            let el = this.editor.container;
            if (data && data.token && data.token.type === "link") {
                el.style.cursor = 'text';
                window.open(data.token.value, "_blank");
            }
        });
        // Event from ace.js extension
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
                    // Stop animation
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
        
        // Collaboration start
        let state=new State();
        let editorSession=this.editor.session;
        this.editor.on('change', e=>{
            let offset=editorSession.doc.positionToIndex(e.start,0);
            switch(e.action){
                case 'insert':
                    break;
                case 'remove':
                    break;
                default:
                    throw new Error('Unknown editor action!');
            }
            //console.log(offset);
        });

        this.serializePacket('request_uid',{
            session_id:23
        });
        this.serializePacket('assign_uid',{
            uid:23
        });

        // Self update size
        reaction(
            ()=>this.props.topModel.u,
            sizes=>this.editor.resize()
        );
    }
    serializePacket(name,data){
        let packetData={
            tag:name,
            data
        };
        let size=packet.size_of(packetData);
        let buffer=Buffer.allocUnsafe(size);
        packet.serialize(packetData,buffer,0);
        console.log(buffer);
    }
    render(){
        return <div ref={e=>this.updateRef(e)} className={aceEditorContainer}>

        </div>
    }
}