/**
 * Root of the application
 */
import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { PrivateRoute } from './_components'
import Header from './Header/Header'
import { Home } from './Home'
import Login from './Header/Login'
import CreateSpotForm from './CreateSpotForm'
import { Whoops404 } from './Whoops404'

export const App = () => {
    return (
        //Main Router
        <Router>      
            <div> 
             <Header/>
                <Switch>   
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path="/create" component={CreateSpotForm}/>
                    <Route path="*/404" component={Whoops404}/>
                </Switch>
            </div>
        </Router>
    )
}
