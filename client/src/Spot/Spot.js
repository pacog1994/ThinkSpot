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
        
        match == null ? 
        this.setState({
            title: this.props.title,
            content: this.props.content,
            username: this.props.username
        })
        
        : 
        
        console.log(JSON.stringify(match))
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