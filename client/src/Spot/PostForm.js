import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addPost} from '../_actions'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import sanitize from 'sanitize-html'
import { withStyles } from '@material-ui/core/styles'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'

/**
 * Form for saving a post in a spot
 */
class PostForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formValue: ""
        }
        this.add = this.add.bind(this)
    }

    add = (e) => {
        e.preventDefault();

        //process spot uid
        var uid = this.props.posts.length

        for(var i = 0; i < this.props.posts.length; i++) {
            if(this.props.posts[i].id !== i) {
               uid = i
               break;
            }
        }
        //var cleanPost = sanitize(this.delta)
        this.props.addPost(this.props.spotId, uid, this.props.user.username, this.delta)

        //reset form value
        this.setState=({formValue: ""})
    }

    onChange = delta => {
        this.delta = delta
    }

    render() {
        const classes = this.props.classes
        return(
            <form className="spotPostForm" onSubmit={this.add}>
                <label className={classes.postLabel} htmlFor="post">New Post</label>
                <br/>
                <br/>
                <ReactQuill theme="snow" 
                            id="post"
                            formats={PostForm.formats}
                            modules={PostForm.modules}
                            onChange={this.onChange}
                            ref={input => this.post = input}
                            placeholder="Type your post here..."
                            value={this.state.formValue}
                            
                 />
                <br></br>
                <button><FaFloppy0/></button>
            </form>
        )
    }
}

PostForm.propTypes = {
    post: PropTypes.string,
    addPost: PropTypes.func.isRequired
}

PostForm.modules = {
    toolbar: [
        [{ 'header': [1, 2, 3]}],
        [{'size': ['small', false, 'large', 'huge' ]}],
        [{'color': []}, {'background': []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}], 
        [{'indent': '-1'}, {'indent': '+1'}],
        ['clean']
    ]
}

PostForm.formats = [
    'header', 'size', 'color', 'background', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
  ]
  

const styles = theme => ({
    postLabel: {
        fontSize: "24px",
        fontWeight: "bold",
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addPost: addPost
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PostForm))


