/**
 * Root of the application
 */
import React, { Component }from 'react'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import { PrivateRoute } from './_components'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Home from './Home'
import Login from './Header/Login'
import Logout from './Header/Logout'
import Spot from './Spot/Spot'
import SpotForm from './Spot/SpotForm'
import MySpots from './MySpots'
import { connect } from 'react-redux'
import { getUsers, getSpots } from './_actions'
import { withStyles } from '@material-ui/core/styles'

import { Whoops404 } from './Whoops404'


class App extends Component {
    
    componentDidMount() {
        console.log("retrieving db data")
        this.props.getUsers();
        this.props.getSpots();
    }
    
    render() {
        const classes = this.props.classes 
        return(
         //Main Router
            <Router>      
                <div className={classes.site}> 
                    <Header/>
                    <div className={classes.siteContent}>
                        <Switch>   
                            <Route exact strict path="/" component={Home}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/logout" component={Logout}/>
                            <PrivateRoute exact strict path="/spots" component={MySpots}/>
                            <PrivateRoute exact strict path="/spot/add" component={SpotForm}/>
                            <Route path="/spots/:id" component={Spot} />
                            <Route path="*/404" component={Whoops404}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}

const styles = {
    site: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    siteContent: {
        flex: "1 0 auto",

    }
}

export default withStyles(styles)(connect(null, { getUsers, getSpots })(App))
