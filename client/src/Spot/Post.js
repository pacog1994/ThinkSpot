import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deletePost, editPost } from '../_actions'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'
import Options from './Options'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,            
        }
    this.edit = this.edit.bind(this)
    this.remove = this.remove.bind(this)
    this.save = this.save.bind(this)
    this.renderPost = this.renderPost.bind(this)
    this.renderForm = this.renderForm.bind(this)
    }

    /**
     * CRUD Methods
     */
    //toggle editing
    edit() {
        this.setState({
            editing: true
        })
    }
    //remove post
    remove = (e) => {
        e.preventDefault()
        this.props.deletePost(this.props.spotId, this.props.post.id)
    }

    //save edited post
    save = (e) => {
        e.preventDefault()

        let post = {
            id: this.props.id,
            author: this.props.post.author,
            post: this.newPost.value,
            comments: this.props.post.comments
        }
        this.props.editPost(this.props.spotId, post)
        this.setState({
            editing: false
        })
    }

    renderForm() {
        return (
            <form className="postForm" onSubmit={this.save}>
                <label htmlFor="prompt">Description</label>
                <br></br>
                <textarea id="prompt" 
                    type="text" 
                    defaultValue={this.props.post.post}
                    ref={input => this.newPost = input}
                />
                <br></br>
                <button><FaFloppy0/></button>
            </form> 
        )

    }

    renderPost() {
        const post = this.props.post
        const classes= this.props.classes

        return(
            <div>
                <div dangerouslySetInnerHTML={{__html: post.post}}/> 
                <p>posted by: <strong>{post.author}</strong></p>
                Reply
                {
                    post.comments !== 0 
                    ? post.comments.map((comment, i) => {
                            return (
                                <Card className={classes.posts} key={i}>
                                    <Typography paragraph>{comment.comment}</Typography>
                                    <Typography>comment by: <strong>{comment.author}</strong></Typography>
                                </Card>
                            )
                        }) 
                    : null
                }
            </div>
        )
    }

    
    render() {
        const classes = this.props.classes
        return (
            <Card className={classes.posts}>
                    { this.props.post.author === this.props.user.username && 
                        !this.state.editing ? 
                    <Options edit={this.edit}
                            remove={this.remove}
                    /> : null
                }
               { !this.state.editing ? this.renderPost() : this.renderForm() }
            </Card>
        )
    }
}

Post.propTypes = { 
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    spotId: PropTypes.number.isRequired
}

const styles = (theme) => ({ 
    p: {
        display: "block",
        marginBlockStart: "0",
        marginBlockEnd: "0",
        marginInlineStart: '0',
        marginInlineEnd: '0'
    },
    posts: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        textAlign: "left"
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deletePost: deletePost,
        editPost: editPost
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post))