import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './components/index'
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));
serviceWorker.unregister();
