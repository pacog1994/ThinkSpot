import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'

export default class Options extends Component {
    render() {
        return (
            <div style={{float: "right"}}>
                <button onClick={this.props.edit}><FaPencil/>Edit</button>
                <button onClick={this.props.remove}><FaTrash/>Remove</button> 
            </div>
        )
    }
}

Options.propTypes = {
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}