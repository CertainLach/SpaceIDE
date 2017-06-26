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
} from "../../../styles/flexPanels.less";
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
} from "../../../styles/mainUi.less";
import Ace from "../../../react-brace-mod";
import "../../../brace-mod/theme-custom/prettydoc";
import "../../../brace-mod/mode/assembly_x86";
import "../../../brace-mod/ext-custom/freespace";
import "../../../brace-mod/ext-custom/gist";
import "../../../brace-mod/ext/linking";
import "../../../brace-mod/mode-custom/prettydoc";
import {inject, observer} from "mobx-react";
import {action} from "mobx";

@inject('bottom')
@observer
class EditorPanel extends Component {
    render() {
        let shouldBeOverlayed = this.props.bottom.fileBrowserOpened;
        return <div className={panel + ' ' + editPane}>
            <div className={top}>
                <div className={fileStatusBlock}/>
                <div className={topStatus}>
                    <div className={topProjName}>stores/</div>
                    <div className={topFileName}>AppStore1.js</div>
                </div>
            </div>
            <div className={panelOverlay + ((!shouldBeOverlayed) ? (' ' + hidden) : '')}/>
            <Ace {...{
                className: aceEditorContainer,
                name: 'brace-editor',
                focus: false,
                mode: 'prettydoc',
                theme: 'prettydoc',
                value: 'tasdasd',
                fontSize: 12,
                showGutter: true,
                onChange: null,
                onPaste: null,
                onLoad: null,
                onScroll: null,
                minLines: null,
                maxLines: null,
                readOnly: false,
                highlightActiveLine: false,
                showPrintMargin: true,
                tabSize: 4,
                cursorStart: 1,
                editorProps: {},
                style: {},
                scrollMargin: [0, 0, 0, 0],
                setOptions: {},
                wrapEnabled: true,
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
            }}/>
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
        console.log('handleDragStart()');
        let x = e.clientX;
        let y = e.clientY;
        this.setState({x, y});
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
    }

    @action
    handleDrag(e) {
        console.log(e);
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
        }
        if (this.props.model.size < 10) this.props.model.size = 10;
        if (this.props.model.size > 90) this.props.model.size = 90;
        console.log(offset);
        console.log('handleDrag()');
    }

    handleDragEnd(e) {
        console.log('handleDragEnd()');
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
    renderSplitbox(model, vertical) {
        let primarySize = model.size;
        if (!primarySize) {
            console.log(model);
            throw new Error('Size is not defined in model!');
        }
        let secondarySize = 100 - primarySize;
        // TODO: Make this code look lesser ugly
        let primaryElement = <Panel
            style={{[vertical ? 'height' : 'width']: `calc(${primarySize}% - ${HANDLE_SIZE / 2}px)`}}
            model={this.props.model.nodes[0]} className={panel}/>;
        let secondaryElement = <Panel
            style={{[vertical ? 'height' : 'width']: `calc(${secondarySize}% - ${HANDLE_SIZE / 2}px)`}}
            model={this.props.model.nodes[1]} className={panel}/>;
        return <div style={this.props.style} className={vertical ? column : row}>
            {primaryElement}
            <SplitterComponent model={model}/>
            {secondaryElement}
        </div>
    }

    renderPanel(model) {
        // TODO
        return <EditorPanel/>;
    }

    render() {
        let model = this.props.model;
        switch (model.type) {
            case 'vsplitbox':
            case 'hsplitbox':
                return this.renderSplitbox(model, model.type === 'vsplitbox');
            case 'panel':
                return this.renderPanel(model);
        }
    }
}

@inject('project')
@observer
export default class ProjectPanelLayout extends Component {
    render() {
        return <div className={main}>
            {/*Recursive model render*/}
            <Panel model={model}/>
        </div>
    }
}