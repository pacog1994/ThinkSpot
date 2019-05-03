import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import SpotList from './SpotList/SpotList'
import { getSpots, updateSort, resetSort } from './_actions'


/**
 * Home page
 */
class Home extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sortBy: this.props.sort
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
        this.props.updateSort(e.target.value)
        this.props.getSpots()
    }

    render() {
        const spots = this.props.spots
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <Grid container  alignItems={'flex-end'} justify="center">
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <Typography component="h1" variant="display2">Top Spots</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    
                        <form className={classes.form} autoComplete="off">
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="sortBy">Sort By</InputLabel>
                                <Select
                                    value={this.state.sortBy}
                                    onChange={this.handleChange} 
                                    inputProps={{
                                        name: 'sortBy',
                                        id: 'sortBy'
                                    }}
                                >
                                    <MenuItem value="SHOW_ALL">
                                        <em></em>
                                    </MenuItem>
                                    <MenuItem value={"MOST_LIKED"}>Most Liked</MenuItem>
                                    <MenuItem value={"MOST_RECENT"}>Most Recent</MenuItem>
                                    <MenuItem value={"MOST_VIEWED"}>Most Viewed</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                    { spots.length !== 0 
                        ? <SpotList spots={spots}/>
                        : <div></div>
                    }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Home.propTypes = {
    spots: PropTypes.array.isRequired,
    updateSort: PropTypes.func,
    resetSort: PropTypes.func
}

const styles = theme => ({
    root: {
        marginTop: 50,
        textAlign: "center"
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSpots: getSpots,
        updateSort: updateSort,
        resetSort: resetSort
    }, dispatch)
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home))
