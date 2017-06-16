import * as React from 'react';
import {observer,Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import App from './App';
import Header from './Header';

@observer
export default class Root extends React.Component {
    render() {
        return (
            <Provider {...this.props.stores}>
                <div>
                    <Header />
                    <App {...this.props}/>
                    {__DEVELOPMENT__?<DevTools />:undefined}
                </div>
            </Provider>
        );
    }
}