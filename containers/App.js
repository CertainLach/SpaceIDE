import {action, observable, useStrict} from "mobx";
import {AppStateProps} from "./stores/AppState";
import React, {Component} from "react";
import {BrowserRouter, Route, StaticRouter, Switch} from "react-router-dom";
import PageWrapper from "../pages/PageWrapper";

useStrict(true);

// cSC - Code Split Component
function cSC(importPromise) {
    return class CodeSplitComponent extends Component {
        static Component = null;
        state = {
            Component: CodeSplitComponent.Component
        };

        componentWillMount() {
            const onDone = Component => {
                Component = Component.default || Component;
                CodeSplitComponent.Component = Component
                this.setState({Component})
            };
            if (!this.state.Component) {
                //const Component;
                // Because in node System.import === require (see webpack.config)
                //if(__BROWSER__)
                importPromise.then(onDone);
                //else
                //    onDone(importPromise);
            }
        }

        render() {
            const {Component} = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null;
        }
    }
}

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
