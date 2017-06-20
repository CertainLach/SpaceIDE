import React,{Component} from 'react';
import{
    inject,
    observer
} from 'mobx-react';
import Chat from "../components/chat/Chat";


@inject('app','bottom')
@observer
export default class Home extends Component {
    componentWillMount(){
        this.props.app.setPage('Чат');
    }
    render() {
        return <Chat/>;
    }
}