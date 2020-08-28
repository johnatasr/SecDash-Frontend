import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
