import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import './index.css';
import { persistor, store } from './store';
import App from './App';
import register from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

register();