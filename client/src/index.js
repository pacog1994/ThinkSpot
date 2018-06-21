/**
 * Entry point for the react application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App }  from './App';
import registerServiceWorker from './registerServiceWorker';
import { storeFactory } from './_store'
import { Provider } from 'react-redux'
import { login } from './_actions'

window.React = React;

const initialState = (localStorage['user']) ?
    JSON.parse(localStorage['user']) : {} 

const store = storeFactory(initialState)

const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['user'] = state
}

store.subscribe(saveState)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
