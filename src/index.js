import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        } else {
            return JSON.parse(serializedState)
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
};
const persistedState = loadFromLocalStorage();
const composedEnhancers = compose(applyMiddleware(thunk), composeWithDevTools());
const store = createStore(rootReducer, persistedState, composedEnhancers);
store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.register();
