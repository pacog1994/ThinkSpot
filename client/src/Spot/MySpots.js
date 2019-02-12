import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Link, withRouter } from 'react-router-dom'

import Spot from './Spot'

import Card from '@material-ui/core/Card'


class MySpots extends Component {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this);
    }

    /**
     * update the selected spot 
     */
    update(newSpot, i) {
        this.setState(prevState => ({
            spots: prevState.spots.map(
                spot => (spot.id !== i) ? spot : {...spot, spot: newSpot }
            )
        }))
    }

   /**
    * removes the selected spot
    * @param {the index of the spot} id 
    */
    remove(id) {} 

    render() {             
        const spots = this.props.spots
        return (
            <div style={{padding: '10px'}}>
                { spots.length !== 0 ? 
                    spots.map((spot, i) => {
                        return (
                            <Link key={i} to={"spots/" + i}>
                                <Card style={{padding: "5px", margin: "5px"}}>
                                    <Spot
                                        key={i}
                                        onChange={this.update}
                                        //state
                                        id={spot.id}
                                        author={spot.author}
                                        title={spot.title}
                                        description={spot.description}
                                    />
                                </Card>
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

const mapStateToProps = (state) => {
    return {
        spots: state.spots
    }
}

export default withRouter(connect(mapStateToProps)(MySpots))