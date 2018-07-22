import React, { Component } from 'react'

export default class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }  
    }

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.content}</p>
                <span>{this.props.username}</span>
            </div>
        )
    }
    
}