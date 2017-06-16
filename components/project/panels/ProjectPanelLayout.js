import React,{Component} from 'react';

import {main,row,column,panel,

    rowElem,
    columnElem} from '../../../styles/flexPanels.less';
import {top,fileStatusBlock,editPane,splitLR,splitTB} from '../../../styles/mainUi.less';

class Panel{}

const model=[new Panel(),[new Panel(),[new Panel(),[new Panel(),new Panel(),new Panel(),new Panel(),new Panel(),new Panel()]]]];

class EditorPanel extends Component{
    render(){
        return <div className={panel+' '+editPane}>
            <div className={top}>
                <div className={fileStatusBlock}/>

            </div>
            {"Panel {potato: State.OFFLINE}"}
        </div>
    }
}

function insertBetween(arr, value) {

    return arr.reduce((result, element, index, array) => {

        result.push(element);

        if (index < array.length - 1) {
            result.push(value);
        }

        return result;
    }, []);
}
const SplitLR =props=> {
    console.log(props);
    return <div className={splitLR}/>;
};
const SplitTB =props=>{
    console.log(props);
    return <div className={splitTB}/>;
};

const Row=props=>{
    const content=insertBetween(props.model.map(e=>{
        if(e instanceof Panel)
            return <EditorPanel model={e}/>;
        else
            return <Column model={e}/>;
    }),<SplitLR/>);
    return <div className={row}>
        {content}
    </div>
};
const Column=props=>{
    const content=insertBetween(props.model.map(e=>{
        if(e instanceof Panel)
            return <EditorPanel model={e}/>;
        else
            return <Row model={e}/>;
    }),<SplitTB/>);
    return <div className={column}>
        {content}
    </div>
};

export default class ProjectPanelLayout extends Component{
    render(){
        return <div className={main}>
            <Row model={model}/>
        </div>
    }
}