import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { logout } from '../_actions'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class Header extends Component {         
    
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    
    logOut = (e) => {
        e.preventDefault();
        this.props.logout()
        window.location = '/'
    }  

    render() {
        
        const loggedIn = (localStorage.getItem('redux-store') !== null 
        && JSON.parse(localStorage.getItem('redux-store'))
        .user.username !== null)
        ? true
        : false

        return ( 
            <div>
                <AppBar position="static" style={{ margin: 0 }}>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Think Spot</Link>
                        </Typography>
                        <div>
                            <Button color="inherit">
                                <Link to="/spot" style={{ textDecoration: "none", color: "inherit" }}>My Spots</Link>
                            </Button>
                        </div>
                        <div >
                            {!loggedIn
                                ? <Button color="inherit"> 
                                    <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                                        Log In
                                    </Link>
                                  </Button>
                                : <div>
                                    <span>{JSON.parse(localStorage.getItem('redux-store')).user.first_name }</span>
                                    <Button onClick={this.logOut} color="inherit">Log Out</Button>
                                </div>
                                
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: logout
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Header)
