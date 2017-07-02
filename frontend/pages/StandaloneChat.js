import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Chat from "chat/Chat";

@inject('app')
@observer
export default class StandaloneChat extends Component {
    componentWillMount() {
        this.props.app.setPage('Standalone chat');
    }

    render() {
        return <Chat/>;
    }
}