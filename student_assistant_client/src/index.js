import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allreducers from './reducers/index'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    allreducers

);

ReactDOM.render(
    <Provider store={store}>
    <div className="wrapper container">
        <App />
    </div>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
