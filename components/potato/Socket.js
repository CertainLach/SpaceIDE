import React, {Component} from "react";

// Autoreconnection socket
class WebSocketClient {
    number = 0; // Message id
    constructor(url, reconnectInterval) {
        this.autoReconnectInterval = reconnectInterval; // ms
        this.open(url);
    }

    open(url) {
        this.url = url;
        this.instance = new WebSocket(this.url);
        this.instance.binaryType = 'arraybuffer';
        this.instance.onopen = () => {
            console.log("WebSocketClient: open!");
            this.onopen();
        };
        this.instance.onmessage = (data, flags) => {
            this.number++;
            this.onmessage(data, flags, this.number);
        };
        this.instance.onclose = (e) => {
            if (!this.safeClose)
                switch (e) {
                    case 1000:	// CLOSE_NORMAL
                        break;
                    default:	// Abnormal closure
                        this.reconnect(e);
                        break;
                }
            this.onclose(e);
        };
        this.instance.onerror = (e) => {
            switch (e.code) {
                case 'ECONNREFUSED':
                    if (!this.safeClose)
                        this.reconnect(e);
                    break;
                default:
                    this.onerror(e);
                    break;
            }
        };
    }

    close() {
        this.safeClose = true;
        this.instance.close();
    }

    send(data, option) {
        try {
            this.instance.send(data, option);
        } catch (e) {
            this.instance.onerror(e);
        }
    }

    reconnect() {
        if (!this.safeClose) {
            console.log(`WebSocket: retry in ${this.autoReconnectInterval}ms`);
            const that = this;
            setTimeout(() => {
                console.log("WebSocket: reconnection...");
                that.open(that.url);
            }, this.autoReconnectInterval);
        }
    }

    onopen(e) {
    }

    onmessage(data, flags, number) {
    }

    onerror(e) {
    }

    onclose(e) {
    }
}

class Socket extends Component {
    constructor(props, context) {
        super(props, context);
        if (!props.url || !props.reconnectInterval || !props.socketName)
            throw new Error('Read docs!');

        this.socket = WebSocketClient(props.url, props.reconnectInterval);

        this.socket.status = 'initialized';
        this.socket.onopen = () => this.socket.status = 'connected';
        this.socket.onclose = () => this.socket.status = 'disconnected';
        this.socket.onerror = () => this.socket.status = 'errored';
    }

    getChildContext() {
        return {[this.props.socketName]: this.socket};
    }

    render() {
        return React.Children.only(this.props.children);
    }
}