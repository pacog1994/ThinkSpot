import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import {editSpot, removeSpot } from '../_actions'

import { withStyles } from '@material-ui/core/styles'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'

import Posts from './Posts'
import PostForm from './PostForm'
import Options from './Options'
import { Quill } from '../Quill'

class Spot extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            id: null,
            author: null,
            title: null,
            description: null,
            posts: []
        }  

        this.save = this.save.bind(this)
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.renderQuestion = this.renderQuestion.bind(this)
        this.renderForm = this.renderForm.bind(this)
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
                description: this.props.description,
                posts: this.props.posts
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
                description: spot.description,
                posts: spot.posts
            })
        }
    }
    
    componentWillReceiveProps(newProps) {
            const spot = newProps.spots.find(spot => {
                return this.props.match.params.id === spot.id.toString()
            })

            this.setState({
                id: spot.id,
                author: spot.author,
                title: spot.title,
                description: spot.description,
                posts: spot.posts
            })
    }
    
    /**
     * CRUD Methods 
     */
    //toggle editing mode
    edit() {
        this.setState({
            editing: true
        })
    }
    //remove spot
    remove() {
        this.props.removeSpot(this.state.id)
        this.props.history.replace('/spots')
    }
    //save edited spot
    save = (e) => {
        e.preventDefault()
        
        let spot = { 
            id: this.state.id,
            author: this.state.author,
            title: this.newTitle.value,
            description: this.newDesc.value,
            posts: this.state.posts
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
            <form className="spotForm" onSubmit={this.save}>
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

    renderQuestion() {
        const classes = this.props.classes
        return (
            <div>
                <div className={classes.header}>
                    <h1>
                        {this.state.title}
                    </h1>
                </div>
                <div className={classes.body}>
                    <p>
                        {this.state.description}
                    </p>
                </div>
                <div className={classes.footer}>
                    <p>
                        <span>asked by: <strong>{this.state.author}</strong></span>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                {  this.state.author === this.props.username && this.props.match.params.id && !this.state.editing ? 
                    <Options edit={this.edit} 
                        remove={this.remove}/> : null 
                    }
                    { !this.state.editing ?  this.renderQuestion() : this.renderForm() }
                {
                    this.state.posts.length === 0 ?
                    <p>There is no answers for this spot</p> :
                    <Posts spotId={this.state.id} posts={this.state.posts}/>
                }

                <div className={classes.header}></div>
                <br></br>
                <PostForm posts={this.state.posts} spotId={this.state.id}/>
            </div>
        )
    }   
}

Spot.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string,
    editing: PropTypes.bool,
    spots: PropTypes.array.isRequired,
    username: PropTypes.string,
    editSpot: PropTypes.func.isRequired,
    removeSpot: PropTypes.func.isRequired
}

const styles = theme => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing.unit * 4,
        width: "60%",
        textAlign: "center" 
    },
    header: {
        borderBottom: "1px solid #e4e6e8",
    },
    body: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2
    },
    footer: {
        padding: theme.spacing.unit * 4
    }
})

const mapStateToProps = (state) => {
    return {
        spots: state.db.spots,
        username: state.user.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editSpot: editSpot,
        removeSpot: removeSpot
    }, dispatch)
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Spot)))



