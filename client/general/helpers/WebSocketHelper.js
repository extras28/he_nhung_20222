import { setCurrentHumidity } from 'features/Plant/plantSlice';

// import store from 'app/store';
let store;

var W3CWebSocket = require('websocket').w3cwebsocket;

const sTag = '[WebsocketHelper]';

class WebsocketHelper {
    // MARK: --- Params ---
    wsClient = null;
    mTimeout = null;

    // MARK: --- Functions ---
    // constructor
    constructor() {
        this.initWebsocket();
    }

    initWebsocket() {
        // console.log(AppConfigs.wsUrl);
        this.wsClient = new W3CWebSocket('wss://wattering-system.onrender.com/', '');
        // this.wsClient = new W3CWebSocket('ws://127.0.0.1:8000', '');

        this.wsClient.onerror = () => {
            console.log(`${sTag} connection error`);
            this.autoReconnect();
        };

        this.wsClient.onopen = () => {
            console.log(`${sTag} websocket client connected`);
        };

        this.wsClient.onclose = () => {
            console.log(`${sTag} echo-protocol client closed`);
            this.autoReconnect();
        };

        this.wsClient.onmessage = e => {
            const data = e.data;

            if (typeof data === 'string') {
                try {
                    this.processReceivedMessage(JSON.parse(data));
                } catch (error) {}
            }
        };

        // this.wsClient.
    }

    // auto reconnect websocket
    autoReconnect() {
        if (this.mTimeout) {
            clearTimeout(this.mTimeout);
            this.mTimeout = null;
        }
        this.mTimeout = setTimeout(() => {
            this.initWebsocket();
        }, 5000);
    }

    // MARK: --- Utils functions ---
    processReceivedMessage(data) {
        try {
            store.dispatch(setCurrentHumidity(data));
            // console.log(`${sTag} received: ${JSON.stringify(data)}`);
        } catch (error) {
            console.log(`${sTag} received error: ${error.message}`);
        }

        if (data) {
            store?.dispatch(setCurrentHumidity(data));
        }
    }

    receiveMqttData() {
        if (this.wsClient.readyState === 1) {
            const data = {
                state: 1,
            };

            this.wsClient.send(JSON.stringify(data));
        }
    }
}

// prevents modification to properties and values of an object
const wsHelperInstance = new WebsocketHelper();

// Object.freeze(wsHelperInstance);

// export
export default wsHelperInstance;

export const injectStore = _store => {
    store = _store;
};
