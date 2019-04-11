import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FaUser from 'react-icons/lib/fa/user'

//Container Component for different links - Log in/out, MySpot and home
class Header extends Component {          
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
        this.logOut = this.logOut.bind(this)
    }
    
    //event handlers
    handleOpen = e => {
        this.setState({ anchorEl: e.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    logOut = e => {
        e.preventDefault()
        this.props.history.push('/logout')
    }  

    render() {
        const { anchorEl } = this.state
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
                        &emsp;&emsp;
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
                                    
                                    <Button
                                        id='menuButton'
                                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                                        aria-haspopup='true'
                                        color='inherit'
                                        onClick={this.handleOpen}
                                    > 
                                    { //If user has a profile picture load, if not use default Avatar picture
                                        this.props.user.profile_picture !== "" 
                                        ? <Avatar src={require("./" + this.props.user.profile_picture)}/>
                                        : <FaUser/> 
                                        
                                    }
                                        <span className={classes.profileName}>{this.props.user.first_name}</span>
                                    </Button>
                                    <Menu
                                        id='simple-menu'
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.logOut} color="inherit">Log Out</MenuItem>
                                    </Menu>
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

const styles = theme =>  ({ 
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    profileName: {
        fontSize: ".8em",
        paddingLeft: theme.spacing.unit * 1
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(Header)))