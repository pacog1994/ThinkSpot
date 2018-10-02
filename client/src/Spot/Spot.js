import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FaPencil from 'react-icons/lib/fa/pencil'; 
import FaTrash from 'react-icons/lib/fa/trash';
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'
import { editSpot, removeSpot } from '../_actions'


class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            spot: {
                id: null,
                author: null,
                title: null,
                description: null
            }
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
        if(!this.props.match) {
            //get spots from parent's props 
            this.setState({
                spot: this.props.spot
            }) 
        } else {
            //get spots from store
            const spots = JSON.parse(localStorage.getItem('redux-store')).spot
            spots.find((spot, i) => {
               if(this.props.match.params.id == i) {
                    this.setState({
                        spot: spot
                    })
               }
            })

        }
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("recieved props for updating") 
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
        this.props.removeSpot(this.state.spot.id)
        window.location = '/spot'

    }

    save() {
        let spot = { 
            id: this.state.spot.id,
            author: this.state.spot.author,
            title: this.newTitle.value,
            description: this.newDesc.value
        }
        this.props.editSpot(spot)
        this.setState({
            editing: false,
            spot: spot
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
                    defaultValue={this.state.spot.title}
                    ref={input => this.newTitle = input}
                />
                <br></br>
                <label htmlFor="prompt">Description</label>
                <br></br>
                <textarea id="prompt" 
                    type="text" 
                    defaultValue={this.state.spot.description}
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
                <h3>{this.state.spot.title}</h3>
                <p>{this.state.spot.description}</p>
                <span>{this.state.spot.author}</span>
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editSpot: editSpot,
        removeSpot: removeSpot
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Spot)

Spot.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string
}

