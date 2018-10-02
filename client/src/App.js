/**
 * Root of the application
 */
import React from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import { PrivateRoute } from './_components'
import Header from './Header/Header'
import { Home } from './Home'
import Login from './Header/Login'
import Spot from './Spot/Spot'
import SpotForm from './Spot/SpotForm'
import MySpots from './Spot/MySpots'
import { Whoops404 } from './Whoops404'


const styles = {
    height: 500
}

export const App = () => {
    return (
         //Main Router
        <Router>      
            <div> 
            <Header/>
                <Switch>   
                    <Route exact strict path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute exact strict path="/spot" component={MySpots}/>
                    <PrivateRoute exact strict path="/spot/add" component={SpotForm}/>
                    <Route path="/spot/:id" component={Spot} />
                    <Route path="*/404" component={Whoops404}/>
                </Switch>
            </div>
        </Router>

    )
}
