import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import SpotList from './SpotList'

/**
 * Spot List using spots from all spots
 */
class GeneralSpotList extends Component {
    render() {
        const spots = this.props.spots
        return (
            <SpotList spots={spots}></SpotList>
        )
    }
}

GeneralSpotList.propTypes = {
    spots: PropTypes.array.isRequired
}

const styles = theme => ({
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots
    }
}

export default withStyles(styles)(connect(mapStateToProps)(GeneralSpotList))
