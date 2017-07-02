import React, {Component} from "react";

// cSC - Code Split Component
export function cSC(importPromise) {
    return class CodeSplitComponent extends Component {
        static Component = null;
        state = {
            Component: CodeSplitComponent.Component
        };

        componentWillMount() {
            const onDone = Component => {
                Component = Component.default || Component;
                CodeSplitComponent.Component = Component;
                this.setState({Component})
            };
            if (!this.state.Component) {
                importPromise.then(onDone);
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