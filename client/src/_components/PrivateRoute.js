import React from "react"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => localStorage.getItem('redux-store') !== null &&  
        JSON.parse(localStorage.getItem('redux-store'))
        .user.username !== null  
        ? <Component {...props} /> 
        : <Redirect to={{pathname: "/login",  state: { from: props.location }}} />
      }
    />
  )