import {action, observable, useStrict} from "mobx";
import {AppStateProps} from "./stores/AppState";
import React, {Component} from "react";
import {BrowserRouter, Route, StaticRouter, Switch} from "react-router-dom";
import PageWrapper from "../pages/PageWrapper";
import {cSC} from '../components/utils/CodeSplitComponent';

useStrict(true);

class App extends Component {
    render() {
        // Route handling
        const CurrentRouter = __BROWSER__ ? BrowserRouter : StaticRouter;
        const routerParams = __NODE__ ? {
            context: this.props.context,
            location: this.props.req.url
        } : {};
        return (<PageWrapper>
            <CurrentRouter {...routerParams}>
                <Switch>
                    <Route exact path="/" component={cSC(System.import('../pages/Home'))}/>
                    <Route exact path="/chat" component={cSC(System.import('../pages/StandaloneChat'))}/>
                    <Route path="*" component={cSC(System.import('../pages/NotFound'))}/>
                </Switch>
            </CurrentRouter>
        </PageWrapper>)
    }
}

export default App;
