import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import  Typography  from '@material-ui/core/Typography'

//mapping of spot links
class SpotList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sort: this.props.sort,
            spots: this.props.spots
        }
    }

    componentDidUpdate(newProps) {
        console.log("SpotList newProps\n" + JSON.stringify(newProps))
        if(newProps.sort !== this.state.sort) {
            this.setState({sort: newProps.sort, spots: newProps.spots})
            console.log("new state\n" + JSON.stringify(this.state.sort))
        }
      
    }
    
    /**
     * sort spot list based off option
     * @param {array} arr
     * @param {string} opt  
     */    
    sortBy(arr, opt) {
        console.log(opt)
        switch(opt) {
            case "MOST_LIKED": arr.sort((arg1, arg2) => {return arg2.likes - arg1.likes}) 
            break
            case "MOST_RECENT": arr.sort((arg1, arg2) => {return arg2.date - arg1.date})
            break 
            case "MOST_VIEWED": arr.sort((arg1, arg2) => {return arg2.views - arg1.views})
            break
            default: return arr
        }
    }

    render() {
        const spots = this.sortBy(this.state.spots, this.state.sort)
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
                                <Typography noWrap>{spot.description}</Typography>
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
        padding: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * .5 
    },
    links: {
        textDecoration: 'none'
    }
})

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}
export default withStyles(styles)(connect(mapStateToProps, null)(SpotList))