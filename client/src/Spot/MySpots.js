import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Spot from './Spot'

export default class MySpots extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            response: [],
            spots: []
        }
        this.update = this.update.bind(this);

    }

    componentDidMount() {
        
        this.setState({ user: JSON.parse(localStorage.getItem('redux-store'))
        .user.username})
        this.callApi()
        .then(res => this.setState({ response: res.Spots}))
        .catch(err => console.log(err))
    }

    callApi = async() => {
        const response = await fetch("/spots/")
        const body = await response.json()
        if (response.status !== 200) throw Error(body.message)
        return body
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
    remove(id) {
        
    } 

    render() {
        
        this.state.spots = JSON.parse(localStorage.getItem('redux-store')).spot != 0 ? JSON.parse(localStorage.getItem('redux-store')).spot : this.state.response 
        
        return (
            <div style={{padding: '10px'}}>
            {
                this.state.spots.map((spot, i) => {
                    return (
                        <Link key={i} to={"spot/" + i}>
                            <Card style={{padding: "5px", margin: "5px"}}>
                                <Spot
                                    key={i}
                                    onChange={this.update}
                                    spot={spot}
                                />
                            </Card>
                        </Link>
                    )
                })
            }
            </div>
        )
    }
}