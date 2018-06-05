/**
 * Entry point for the react application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App }  from './components/App';
import registerServiceWorker from './registerServiceWorker';

window.React = React;


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

registerServiceWorker();
