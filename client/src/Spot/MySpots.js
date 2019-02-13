import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Spot from './Spot'

class MySpots extends Component {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
    }

    /**
     * update the selected spot 
     */
    update(newSpot, i) {
        this.setState(prevState => ({
            spots: prevState.spots.map(
                spot => (spot.id !== i) 
                ? spot 
                : { spot: newSpot, ...spot }
            )
        }))
    }

    render() {      
        const spots = this.props.spots
        const classes = this.props.classes

        return (
            <div className={classes.root}>
                { spots.length !== 0 
                ?   spots.map((spot) => {
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
                :
                    this.props.history.push('/')
                }
            </div>
        )
    }
}

MySpots.propTypes = {
 spots: PropTypes.array.isRequired
}

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2
    },
    links: {
        textDecoration: 'none'
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.spots
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps)(MySpots)))