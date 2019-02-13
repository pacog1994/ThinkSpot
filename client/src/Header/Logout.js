import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout, getUsers, getSpots } from '../_actions'

/**
 * Handles logout and redirect
 */
class Logout extends Component {  
    render() { 
        this.props.logout();
        this.props.getUsers();
        this.props.getSpots();
        this.props.history.push('/');
        return (<div></div>)}
}

Logout.PropTypes = { 
    logout: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: logout,
        getUsers: getUsers,
        getSpots: getSpots
    }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(Logout))