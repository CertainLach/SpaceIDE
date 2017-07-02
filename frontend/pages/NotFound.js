import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

@inject('app')
@observer
export default class NotFound extends Component {
    componentWillMount() {
        this.props.app.setPage('Page not found');
    }

    render() {
        return <Link to="/">Return to home</Link>
    }
}
