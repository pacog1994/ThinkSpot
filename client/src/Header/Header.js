import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../_actions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

class Header extends Component {          
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    
    logOut = (e) => {
        e.preventDefault();
        this.props.logout()
        window.location = '/'
        //this.props.history.push('/')
    }  

    render() {
        const loggedIn = this.props.user.username !== null ? true : false
        return ( 
            <div>
                <AppBar position="static" style={{ margin: 0 }}>
                    <Toolbar>
                        <Typography 
                            variant="title" 
                            color="inherit">
                            <Link 
                                to="/" 
                                style={{ textDecoration: "none", color: "inherit" }}>
                                Think Spot
                            </Link>
                        </Typography>
                        <div >
                            {!loggedIn
                                ? <Button color="inherit"> 
                                    <Link 
                                        to="/login" 
                                        style={{ textDecoration: "none", color: "inherit" }}>
                                        Log In
                                    </Link>
                                  </Button>
                                : 
                                <div>
                                    <Button 
                                        color="inherit">
                                        <Link 
                                            to="/spots" 
                                            style={{ textDecoration: "none", color: "inherit" }}>
                                            My Spots
                                        </Link>
                                    </Button>
                                    <span>{this.props.user.first_name}</span>
                                    <Button onClick={this.logOut} color="inherit">
                                        Log Out
                                    </Button>
                                </div>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

Header.propTypes = { 
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: logout
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
