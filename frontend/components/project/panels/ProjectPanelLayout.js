import React, {Component} from "react";
import SplitBoxModel from 'models/panels/SplitBox';
import PanelModel from 'models/panels/Panel';

import autobind from 'autobind-decorator'
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
class PanelOverlay extends Component {
    render(){
        // TODO: Handle selection and clicks
        let shouldBeOverlayed = this.props.bottom.fileBrowserOpened;
        return <div className={panelOverlay + (!shouldBeOverlayed? (' ' + hidden) : '')}/>
    }
}

@observer
class EditorPanel extends Component {
    render() {
        return <div className={panel + ' ' + editPane}>
            <PanelTop model={this.props.model}/>
            <PanelOverlay model={this.props.model}/>
            <ComponableEditorPanel model={this.props.model} topModel={this.props.topModel}/>
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

    @action.bound
    handleDrag(e) {
        let x = e.clientX;
        let y = e.clientY;
        let offset = {
            x: x - this.state.x,
            y: y - this.state.y
        };
        this.setState({x, y});
        if (this.props.model instanceof SplitBoxModel) {
            if(this.props.model.vertical)
                this.props.model.size += offset.y / 3;
            else 
                this.props.model.size += offset.x / 3;
        } else{
            throw new Error('Unknown split panel type!');
        }
        // Update every panel size
        this.props.topModel.u++;
        // Min-Max
        if (this.props.model.size < 10) this.props.model.size = 10;
        if (this.props.model.size > 90) this.props.model.size = 90;
    }

    @autobind
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
            className={handleBar + ' ' + (this.props.model.vertical ? horizontal : '')}
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
        if(model instanceof SplitBoxModel)
            return this.renderSplitbox(model, model.vertical, topModel);
        if(model instanceof PanelModel)
            return this.renderPanel(model,topModel);
        throw new Error('Wrong model!');
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