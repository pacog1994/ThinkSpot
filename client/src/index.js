/**
 * Entry point for the react application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App }  from './App';
import registerServiceWorker from './registerServiceWorker';
import { storeFactory } from './_store'
import { Provider } from 'react-redux'

window.React = React;

const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) : {} 

const store = storeFactory(initialState)

const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
}

store.subscribe(saveState)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
