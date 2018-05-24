/**
 * Entry point for the react application
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/Header';
import { App } from './components/App';
import CreateSpotForm from'./components/CreateSpotForm';
import { Whoops404 } from './components/Whoops404';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

window.React = React;

//Main Router
ReactDOM.render(
    //Router can only have one child
    <Router>      
        <div>
        <Header/>      
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/create" render={() => <CreateSpotForm/>}/>
            <Route path="*/404" component={Whoops404}/>
        </Switch> 
        </div>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();
