import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import SpotList from './SpotList'

/**
 * Spot List using spots specific to user
 */
class UserSpotList extends Component {
    render() {
        const spots = this.props.spots.filter(spot => spot.author === this.props.user.username)
        return (
            <SpotList spots={spots}></SpotList>
        )
    }
}

UserSpotList.propTypes = {
    spots: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
}

const styles = theme => ({
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots,
        user: state.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(UserSpotList))