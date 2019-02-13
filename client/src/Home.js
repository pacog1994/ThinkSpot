import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Spot from './Spot/Spot'


/**
 * Home page
 */
class Home extends Component {
    
    componentDidMount() {

    }

    render() {
        const spots = this.props.spots
        const classes = this.props.classes
        return (
            <div style={{textAlign: "center", marginTop: 50, height: 100}}>
                <Link to="/spot/add" style={{textDecoration: "none"}}>
                    <Button variant="outlined" color="primary">Create a Spot!</Button>
                </Link>
                <br></br>
                <br></br>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <Typography component="h1" variant="h1">Top Spots</Typography>
                <br></br>
                { spots.length !== 0 
                    ? spots.map(spot => { 
                        return (
                            <Link key={spot.id} 
                                to={"spots/" + spot.id} 
                                className={classes.links}>  
                                <Spot
                                    onChange={this.update}
                                    //state
                                    id={spot.id}
                                    author={spot.author}
                                    title={spot.title}
                                    description={spot.description}
                                />
                            </Link>   
                        )
                    })
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
    },
    links: {
        textDecoration: 'none'
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Home))
