import React,{Component} from 'react';
import {observer} from 'mobx-react';
import {container,top} from '../styles/mainUi.less';

@observer
export default class PageWrapper extends Component {
    render() {
        return <div id={container}>
            {this.props.children}
        </div>
    }
}
