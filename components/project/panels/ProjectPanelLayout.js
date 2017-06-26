import React, {Component} from "react";

import {
    column,
    columnElem,
    drag,
    handleBar,
    hidden,
    horizontal,
    main,
    panel,
    panelOverlay,
    row,
    rowElem,
    splitter
} from "styles/flexPanels.less";
import {
    editPane,
    fileStatusBlock,
    splitLR,
    splitTB,
    top,
    topFileName,
    topProjName,
    topStatus
} from "styles/mainUi.less";
import {errored,saved,saving,idle} from 'styles/mainUi.less';
import {inject, observer} from "mobx-react";
import {action, autorun} from "mobx";
import {cSC} from 'utils/CodeSplitComponent';

class ComponableEditorPanel extends Component {
    render(){
        let model=this.props.model;
        let topModel=this.props.topModel;
        let RealPanel;
        switch (model.panelType){
            case 'codeEditor':
                RealPanel=cSC(System.import('./variants/CodeEditorPanel'));
                break;
        }
        if(!RealPanel)
            throw new Error('Error at rendering!');
        return <RealPanel topModel={topModel} model={model}/>;
    }
}

@observer
class PanelTop extends Component{
    render(){
        let {model}=this.props;
        let secondaryStatus='';
        switch(model.status){
            case 'errored':secondaryStatus=errored;break;
            case 'saved':secondaryStatus=saved;break;
            case 'saving':secondaryStatus=saving;break;
            case 'idle':secondaryStatus=idle;break;
            default: throw new Error('Unknown model panel status block! '+model.status);
        }
        return <div className={top}>
            <div className={`${fileStatusBlock} ${secondaryStatus}`}/>
            {model.fileName?<div className={topStatus}>
                <div className={topProjName}>{model.fileName.slice(0, model.fileName.lastIndexOf('/')+1)}</div>
                <div className={topFileName}>{model.fileName.slice(model.fileName.lastIndexOf('/')+1)}</div>
            </div>:null}
        </div>
    }
}

@inject('bottom')
@observer
class EditorPanel extends Component {
    render() {
        let shouldBeOverlayed = this.props.bottom.fileBrowserOpened;
        return <div className={panel + ' ' + editPane}>
            <PanelTop model={this.props.model}/>
            <div className={panelOverlay + ((!shouldBeOverlayed) ? (' ' + hidden) : '')}/>
            <ComponableEditorPanel model={this.props.model} topModel={this.props.topModel}/>
            {/*<Ace {...{*/}
                {/*className: aceEditorContainer,*/}
                {/*name: 'brace-editor',*/}
                {/*focus: false,*/}
                {/*mode: 'prettydoc',*/}
                {/*theme: 'prettydoc',*/}
                {/*value: 'tasdasd',*/}
                {/*fontSize: 12,*/}
                {/*showGutter: true,*/}
                {/*onChange: null,*/}
                {/*onPaste: null,*/}
                {/*onLoad: null,*/}
                {/*onScroll: null,*/}
                {/*minLines: null,*/}
                {/*maxLines: null,*/}
                {/*readOnly: false,*/}
                {/*highlightActiveLine: false,*/}
                {/*showPrintMargin: true,*/}
                {/*tabSize: 4,*/}
                {/*cursorStart: 1,*/}
                {/*editorProps: {},*/}
                {/*style: {},*/}
                {/*scrollMargin: [0, 0, 0, 0],*/}
                {/*setOptions: {},*/}
                {/*wrapEnabled: true,*/}
                {/*enableBasicAutocompletion: false,*/}
                {/*enableLiveAutocompletion: false,*/}
            {/*}}/>*/}
        </div>
    }
}

// TODO: Somehow import this value from css? (flexPanels.less)
const HANDLE_SIZE = 10;

@observer
class SplitterComponent extends Component {
    bound = false;
    state = {
        x: 0,
        y: 0
    };

    handleDragStart(e) {
        if (!this.bound) {
            // TODO: autobind
            this.handleDrag = this.handleDrag.bind(this);
            this.handleDragEnd = this.handleDragEnd.bind(this);

            this.bound = true;
        }
        let x = e.clientX;
        let y = e.clientY;
        this.setState({x, y});
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
    }

    @action
    handleDrag(e) {
        let x = e.clientX;
        let y = e.clientY;
        let offset = {
            x: x - this.state.x,
            y: y - this.state.y
        };
        this.setState({x, y});
        if (this.props.model.type === 'vsplitbox') {
            this.props.model.size += offset.y / 3;
        } else if (this.props.model.type === 'hsplitbox') {
            this.props.model.size += offset.x / 3;
        } else{
            throw new Error('Unknown split panel type!');
        }
        if (this.props.model.size < 10) this.props.model.size = 10;
        if (this.props.model.size > 90) this.props.model.size = 90;
    }

    handleDragEnd(e) {
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
    }

    render() {
        return <div
            className={handleBar + ' ' + (this.props.model.type === 'vsplitbox' ? horizontal : '')}
            onMouseDown={(e) => this.handleDragStart.bind(this)(e)}
        >
            <span className={drag}/>
        </div>
    }
}

@observer
export class Panel extends Component {
    renderSplitbox(model, vertical, topModel) {
        let primarySize = model.size;
        if (!primarySize) {
            console.log(model);
            throw new Error('Size is not defined in model!');
        }
        let secondarySize = 100 - primarySize;
        let primaryStyle={[vertical ? 'height' : 'width']: `calc(${primarySize}% - ${HANDLE_SIZE / 2}px)`};
        let secondaryStyle={[vertical ? 'height' : 'width']: `calc(${secondarySize}% - ${HANDLE_SIZE / 2}px)`};
        let primaryElement = <Panel
            topModel={topModel}
            style={primaryStyle}
            model={this.props.model.nodes[0]} className={panel}/>;
        let secondaryElement = <Panel
            topModel={topModel}
            style={secondaryStyle}
            model={this.props.model.nodes[1]} className={panel}/>;
        return <div style={this.props.style} className={vertical ? column : row}>
            {primaryElement}
            <SplitterComponent
                model={model}
                topModel={topModel}
            />
            {secondaryElement}
        </div>
    }

    renderPanel(model, topModel) {
        return <EditorPanel model={model} topModel={topModel}/>;
    }

    render() {
        let model = this.props.model;
        let topModel = this.props.topModel;
        switch (model.type) {
            case 'vsplitbox':
            case 'hsplitbox':
                return this.renderSplitbox(model, model.type === 'vsplitbox', topModel);
            case 'panel':
                return this.renderPanel(model, topModel);
        }
    }
}

@inject('project')
@observer
export default class ProjectPanelLayout extends Component {
    render() {
        return <div className={main}>
            {/*Recursive model render*/}
            <Panel model={this.props.project.layoutModel} topModel={this.props.project.layoutModel}/>
        </div>
    }
}