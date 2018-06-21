import React from 'react'; 
import { Route, Link } from 'react-router-dom'
import { Navigation } from './Navigation'
import Login from './Login'

export const Header = () => {
    return (
    <div>
        <Navigation/>
        <Link to="/login">Log In</Link>
        <Route path="/login" component={Login} />
    </div>
    )
}