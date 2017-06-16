import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from '../containers/Root';
import {AppContainer} from 'react-hot-loader';
import App from '../containers/App';
import {createClientStore, createStore} from '../stores';

const store = createClientStore(createStore());

const render = (Root, container = document.getElementById('App')) => {
    ReactDOM.render(
        React.createElement(Root,{stores:store}),
        container,
    );
}

render(Root);

if (__DEVELOPMENT__ && module.hot) {
    const reload = (reloadStore = false) => () => {
        // TODO: Reload store
        render(require('../containers/Root').default);
    };
    module.hot.accept(['../containers/Root'], reload());
    module.hot.accept(['../containers/App'], reload(true));
}