import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import  Typography  from '@material-ui/core/Typography'

//mapping of spot links
class SpotList extends Component {
    render() {
        const spots = this.props.spots
        const classes = this.props.classes
        return (
            <div>
            { spots.map(spot => { 
                    return (
                        <Link key={spot.id} 
                            to={"spots/" + spot.id} 
                            className={classes.links}>  
                            <Card className={this.props.classes.root}>
                                <h1>{spot.title}</h1>
                                <p>{spot.description}</p>
                                <h3>{spot.author}</h3>
                            </Card>
                        </Link>   
                    )
                })
            }
            </div>
        )
    }
}

SpotList.propTypes = {
    spots: PropTypes.array.isRequired
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(), 
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * .5 
    },
    links: {
        textDecoration: 'none'
    }
})

export default withStyles(styles)(SpotList)