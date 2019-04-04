import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import GeneralSpotList from './SpotListTypes/GeneralSpotList'


/**
 * Home page
 */
class Home extends Component {
    
    componentDidMount() {

    }

    render() {
        const spots = this.props.spots
        return (
            <div style={{textAlign: "center", marginTop: 50}}>
                <Grid container justify="center">
                    <Grid item alignItems={'flex-end'} xs={10}>
                        <Typography component="h1" variant="h1">Top Spots</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <span> Filter </span>
                    </Grid>
                </Grid>
                <br></br>
                { spots.length !== 0 
                    ? <GeneralSpotList></GeneralSpotList>
                    : <div></div>
                }
            </div>
        )
    }


}

Home.propTypes = {
    spots: PropTypes.array.isRequired
}

const styles = theme => ({
    root: {
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Home))
