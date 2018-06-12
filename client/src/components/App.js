/**
 * Root of the application
 */
import React from 'react'
import { Header } from './Header/Header'
import { Home } from './Home'
import CreateSpotForm from './CreateSpotForm'
import { Whoops404 } from './Whoops404'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import C from '../constants'
import storeFactory from '../store';

const initialState = (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {} 

const saveState = () => {
    const state = JSON.stringify(store.getState())
    localStorage['redux-store'] = state
}

const store = storeFactory(initialState)

store.subscribe(saveState)

store.dispatch({
    type: C.LOGIN_USER,
    payload: {

        "first_name": "Paco",
        "last_name": "Gallegos",
        "username": "paco123"
    
    }
})

store.dispatch({
    type: C.LOGOUT_USER
})

export const App = () => {
    return (
        //Main Router
        <Router>      
            <div>
                <Header/> 
                <Switch>   
                    <Route exact path="/" component={Home}/>
                    <Route path="/create" component={CreateSpotForm}/>
                    <Route path="*/404" component={Whoops404}/>
                </Switch>
            </div>
        </Router>
    )
}
