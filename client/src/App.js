/**
 * Root of the application
 */
import React, { Component }from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import { PrivateRoute } from './_components'
import Header from './Header/Header'
import { Home } from './Home'
import Login from './Header/Login'
import Spot from './Spot/Spot'
import SpotForm from './Spot/SpotForm'
import MySpots from './Spot/MySpots'
import { connect } from 'react-redux'
import { getUsers, getSpots } from './_actions'


import { Whoops404 } from './Whoops404'

class App extends Component {
    
    componentDidMount() {
        console.log("retrieving db data")
        this.props.getUsers();
        this.props.getSpots();
    }
    
    render() {
        console.log("Rendering App")
        return(
         //Main Router
            <Router>      
                <div> 
                <Header/>
                    <Switch>   
                        <Route exact strict path="/" component={Home}/>
                        <Route path="/login" component={Login}/>
                        <PrivateRoute exact strict path="/spots" component={MySpots}/>
                        <PrivateRoute exact strict path="/spot/add" component={SpotForm}/>
                        <Route path="/spots/:id" component={Spot} />
                        <Route path="*/404" component={Whoops404}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect(null, { getUsers, getSpots })(App)
