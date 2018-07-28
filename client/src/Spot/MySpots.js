import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import Spot from './Spot'

export default class MySpots extends Component {
    
    constructor(props) {
        super(props)
    }
   /**
    * removes the selected spot
    * @param {the index of the spot} id 
    */
    remove(id) {
        
    } 
    
    render() {
        const spots = JSON.parse(localStorage.getItem('redux-store')).spot
        spots.map((spot, i) => {
            console.log(`
                key = ${i}
                title = ${spot.title}
                content = ${spot.content}
                username = ${spot.username}
            `)
        })
        return (
            <div style={{padding: '10px'}}>
            {
                spots.map((spot, i) => {
                    return (
                        <Link to={"spot/" + i}>
                            <Card style={{padding: "5px", margin: "5px"}}>
                                <Spot
                                    key={i}
                                    title={spot.title}
                                    content={spot.content}
                                    username={spot.username}
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