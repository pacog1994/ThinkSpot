import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom'

import { editSpot, removeSpot } from '../_actions'

import FaPencil from 'react-icons/lib/fa/pencil'; 
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'



class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            id: null,
            author: null,
            title: null,
            description: null
        }  
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
    }

    /**
     * Component Life Cycle Methods
     */

    componentDidMount() {
        if(this.props.match.params.id == null) {
            //get from parent
            this.setState({
                id: this.props.id,
                author: this.props.author,
                title: this.props.title,
                description: this.props.description
            })
        } else {
            //get from store
            const spot = this.props.spots.find(spot => {
                return this.props.match.params.id === spot.id.toString()
            })

            this.setState({ 
                id: spot.id,
                author: spot.author,
                title: spot.author,
                description: spot.description
            })

        }
    }
    
    /**
     * CRUD Methods 
     */

    edit() {
        this.setState({
            editing: true
        })
    }

    remove() {
        this.props.removeSpot(this.state.id)
        window.location = '/spots'

    }

    save() {
        let spot = { 
            id: this.state.id,
            author: this.state.author,
            title: this.newTitle.value,
            description: this.newDesc.value
        }
        this.props.editSpot(spot)
        this.setState({
            editing: false,
            title: this.newTitle.value,
            description: this.newDesc.value
        })
    }

    /**
     *  Render Methods
     */
    
    renderForm() {
        return (
            <form className="editSpotForm" onSubmit={this.save}>
                <label htmlFor="title">Title</label>
                <br></br>
                <input id="title"
                    type="text"
                    defaultValue={this.state.title}
                    ref={input => this.newTitle = input}
                />
                <br></br>
                <label htmlFor="prompt">Description</label>
                <br></br>
                <textarea id="prompt" 
                    type="text" 
                    defaultValue={this.state.description}
                    ref={input => this.newDesc = input}
                />
                <br></br>
                <button><FaFloppy0/></button>
            </form> 
        )
    }

    renderDisplay() {
        return (
            <div>
                <h3>{this.state.title}</h3>
                <p>{this.state.description}</p>
                <span>{this.state.author}</span>
            </div>
        )
    }

    /**
     * render options if looking in Spots page and not in editing mode
     */
    renderOptions() {
        return (
            <div style={{float: "right"}}>
                <button onClick={() => this.edit()}><FaPencil/>Edit</button>
                <button onClick={() => this.remove()}><FaTrash/>Remove</button> 
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.props.match && !this.state.editing ? this.renderOptions() : null }
                { !this.state.editing ?  this.renderDisplay() : this.renderForm() }
            </div>
        )
    }   
}

Spot.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string,
    editSpot: PropTypes.func.isRequired,
    removeSpot: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        spots: state.spots
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editSpot: editSpot,
        removeSpot: removeSpot
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Spot))



