import React, {Component} from "react";
import {observer, Provider} from "mobx-react";
import DevTools from "mobx-react-devtools";
import App from "./App";
import Header from "./Header";

@observer
export default class Root extends Component {
    render() {
        return (
            <Provider {...this.props.stores}>
                <div>
                    <App {...this.props}/>
                    {__DEVELOPMENT__?<DevTools
                        highlightTimeout={3000}
                        position={{ 
                            top: 0, 
                            right: 200 
                        }}
                    />:null}
                    <Header/>
                </div>
            </Provider>
        );
    }
}