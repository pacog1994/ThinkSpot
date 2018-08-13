import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Spot from './Spot'

export default class MySpots extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            spots: []
        }
    }

   /**
    * removes the selected spot
    * @param {the index of the spot} id 
    */
    remove(id) {
        
    } 
    
    render() {
        this.state.spots = JSON.parse(localStorage.getItem('redux-store')).spot
        this.state.spots.map((spot, i) => {
            console.log(`
                key = ${i}
                title = ${spot.title}
                description = ${spot.description}
                username = ${spot.author}
            `)
        })
        return (
            <div style={{padding: '10px'}}>
            {
                this.state.spots.map((spot, i) => {
                    return (
                        <Link key={i} to={"spot/" + i}>
                            <Card style={{padding: "5px", margin: "5px"}}>
                                <Spot
                                    key={i}
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