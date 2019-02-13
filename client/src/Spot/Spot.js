import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom'

import { editSpot, removeSpot } from '../_actions'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
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
        console.log("Component mounted & rendering spot")
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
                title: spot.title,
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
        this.props.history.replace('/spots')
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
                <Typography component="h2" variant="h1" gutterBottom>
                    {this.state.title}
                </Typography>
                <Typography component="body2" variant="body1">
                    {this.state.description}
                </Typography>
                <Typography component="subtitle1" variant="subtitle1">
                    <span>{this.state.author}</span>
                </Typography>
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
                 <Card className={this.props.classes.root}>
                    {  this.props.match.params.id && !this.state.editing ? this.renderOptions() : null }
                    { !this.state.editing ?  this.renderDisplay() : this.renderForm() }
                </Card>
            </div>
        )
    }   
}

Spot.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string,
    editing: PropTypes.bool,
    classes: PropTypes.object.Required,
    spots: PropTypes.array.isRequired,
    editSpot: PropTypes.func.isRequired,
    removeSpot: PropTypes.func.isRequired
}

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(), 
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * .5 
    },
})

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

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spot)))



