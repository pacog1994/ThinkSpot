import React, { Component } from 'react'
import FaPencil from 'react-icons/lib/fa/pencil'; 
import FaTrash from 'react-icons/lib/fa/trash';

export default class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false
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
        return (
            <div>
                <div style={{float: "right"}}>
                    <button onClick={() => this.edit()}><FaPencil/>Edit</button>
                    <button onClick={() => this.remove()}><FaTrash/>Remove</button> 
                </div>

                <h3>{this.props.title}</h3>
                <p>{this.props.content}</p>
                <span>{this.props.username}</span>
            </div>
        )
    }
    
}