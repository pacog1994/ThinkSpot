import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addPost} from '../_actions'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'

/**
 * Form for saving a post in a spot
 */
class PostForm extends Component {

    constructor(props) {
        super(props)
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

        this.props.addPost(this.props.spotId, uid, this.props.user.username, this.delta)
    }

    onChange = (delta) => {
        this.delta = delta
    }

    render() {
        return(
            <form className="spotPostForm" onSubmit={this.add}>
                <label htmlFor="post">New Post</label>
                <br></br>
                <ReactQuill theme="snow" 
                            id="post"
                            onChange={this.onChange}
                            ref={input => this.post = input}
                            modules={PostForm.modules}
                            formats={PostForm.formats}
                 />
                {/* <textarea id="post" 
                    type="text" 
                    ref={input => this.post = input}
                /> */}
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
        [{ 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}]
      ]
}

PostForm.formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent'
  ]
  

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

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)


