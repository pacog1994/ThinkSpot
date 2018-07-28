import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'; 
import FaTrash from 'react-icons/lib/fa/trash';

export default class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            title: null,
            content: null,
            username: null
        }  
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
    }
  
    edit() {
        this.setState({
            editing: true
        })
    }

    remove() {
        
    }


    render() {

        const spots = JSON.parse(localStorage.getItem('redux-store')).spot

        spots.find((spot, i) => {
            if(this.props.match.params.id === i) {
                this.state.title = spot.title
                this.state.content = spot.content
                this.state.username = spot.username
            }
        })

        return (
            <div>
                <div style={{float: "right"}}>
                    <button onClick={() => this.edit()}><FaPencil/>Edit</button>
                    <button onClick={() => this.remove()}><FaTrash/>Remove</button> 
                </div>

                <h3>{this.state.title}</h3>
                <p>{this.state.content}</p>
                <span>{this.state.username}</span>
            </div>
        )
    }
    
}