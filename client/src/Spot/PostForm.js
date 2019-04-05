import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addPost} from '../_actions'

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

        this.props.addPost(this.props.spotId, uid, this.props.user.username, this.post.value)
    }

    render() {
        return(
            <form className="spotPostForm" onSubmit={this.add}>
                <label htmlFor="post">New Post</label>
                <br></br>
                <textarea id="post" 
                    type="text" 
                    ref={input => this.post = input}
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


