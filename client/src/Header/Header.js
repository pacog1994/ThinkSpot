import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//Container Component for different links - Log in/out, MySpot and home
class Header extends Component {          
    constructor(props) {
        super(props)
        this.logOut = this.logOut.bind(this)
    }
    
    logOut = (e) => {
        e.preventDefault()
        this.props.history.push('/logout')
    }  

    render() {
        const loggedIn = this.props.user.username !== null ? true : false
        const classes = this.props.classes
        return ( 
            <div className={classes.root}>
                <AppBar position="static">
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
    user: PropTypes.object
}

const styles =  { 
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Header)))