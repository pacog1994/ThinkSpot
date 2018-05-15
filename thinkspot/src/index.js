/**
 * Entry point for the react application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';
import { Whoops404 } from './components/whoops404';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

window.React = React;

//Main Router
ReactDOM.render(
    //Router can only have one child
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/*" component={Whoops404}/>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
