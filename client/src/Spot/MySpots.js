import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import UserSpotList from './SpotListTypes/UserSpotList'
import { getSpot } from '../_actions'

//Container for user-related spots
class MySpots extends Component {

    render() {      
        const spots = this.props.spots.filter(spot => spot.author === this.props.user.username)
        const classes = this.props.classes

        return (
            <div className={classes.root}>
                <Link to="/spot/add" className={classes.create_spot}>
                    <Button variant="outlined" color="primary">Create a Spot!</Button>
                </Link>
                { spots.length !== 0 
                ?   <UserSpotList></UserSpotList>
                : this.props.history.push('/')
                }
            </div>
        )
    }
}

MySpots.propTypes = {
 spots: PropTypes.array.isRequired,
 user: PropTypes.object.isRequired,
 getSpot: PropTypes.func.isRequired
}

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    links: {
        textDecoration: 'none'
    },
    create_spot: {
        textDecoration: 'none'
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSpot: getSpot
    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MySpots)))