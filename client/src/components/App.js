/**
 * Root of the application
 */
import React, { Component } from 'react';
import { Header } from './Header/Header';
import { Home } from './Home';
import CreateSpotForm from'./CreateSpotForm';
import { Whoops404 } from './Whoops404';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export const App = () => {

    return (
        //Main Router
        <Router>      
            <div>
                <Header/>      
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/create" render={() => <CreateSpotForm/>}/>
                    <Route path="*/404" component={Whoops404}/>
                </Switch> 
            </div>
        </Router>
    )
}
