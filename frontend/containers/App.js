import {action, observable, useStrict} from "mobx";
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
                {__BROWSER__?<Switch>
                    {/*Browser side*/}
                    <Route exact path="/" component={cSC(System.import('../pages/Home'))}/>
                    <Route exact path="/chat" component={cSC(System.import('../pages/StandaloneChat'))}/>
                    <Route path="*" component={cSC(System.import('../pages/NotFound'))}/>
                </Switch>:<Switch>
                    {/*Node.js side*/}
                    <Route exact path="/" component={require('../pages/Home')}/>
                    <Route exact path="/chat" component={require('../pages/StandaloneChat')}/>
                    <Route path="*" component={require('../pages/NotFound')}/>
                </Switch>}
            </CurrentRouter>
        </PageWrapper>)
    }
}

export default App;
