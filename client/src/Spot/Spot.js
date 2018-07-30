import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'; 
import FaTrash from 'react-icons/lib/fa/trash';

export default class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            id: null,
            title: null,
            content: null,
            username: null
        }  
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
    }

    componentDidMount() {
        const { match } = this.props

        if(!match) { 
            this.setState({
                title: this.props.title,
                content: this.props.content,
                username: this.props.username
            }) 
        } else {
            const spots = JSON.parse(localStorage.getItem('redux-store')).spot
            spots.find((spot, i) => {
               if(match.params.id == i) {
                    this.setState({
                        title: spot.title,
                        content: spot.content,
                        username: spot.username
                    })
               }
            })

        }
    }
  
    edit() {
        this.setState({
            editing: true
        })
    }

    remove() {
        
    }


    render() {
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