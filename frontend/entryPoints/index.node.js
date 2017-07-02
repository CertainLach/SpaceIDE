import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import Root from "containers/Root";
import {createServerStore, createStore} from "stores";


export async function render(req) {
    let store = createStore();
    const routerContext = {};
    const renderedPage = await ReactDOMServer.renderToString(React.createElement(Root, {
        req,
        context: routerContext,
        stores: store
    }));
    const serverStore = createServerStore(store);
    return ({
        renderedPage,
        serverStore,
        routerContext
    });
}