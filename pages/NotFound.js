import React, {Component} from 'react';
import {inject,observer} from 'mobx-react';
import {Link} from 'react-router-dom';

@inject('app')
@observer
export default class NotFound extends Component {
    componentWillMount(){
        this.props.app.setPage('Страница не найдена');
    }
    render() {
        return <Link to="/">На главную</Link>
    }
}
