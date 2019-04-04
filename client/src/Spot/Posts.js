import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'

class Posts extends Component {  
    render() {
        const classes = this.props.classes 
        return (
            <div className={classes.postContainer}> 
               <h2>Posts [{this.props.posts.length}]</h2>
               {
                   this.props.posts.map((post) => {
                        return (
                            //Single Posts
                            <Card className={classes.posts}>
                                <p>{post.post}</p>
                                <p>posted by: <strong>{post.author}</strong></p>
                                <a href="#">Reply</a>
                                {
                                    post.comments !== 0 
                                    ? post.comments.map((comment, i) => {
                                            return (
                                                <Card className={classes.posts} key={i}>
                                                    <p>{comment.comment}</p>
                                                    <p>comment by: <strong>{comment.author}</strong></p>
                                                </Card>
                                            )
                                        }) 
                                    : null
                                }
                            </Card>
                        )
                   })
               }
            </div>
        )
    }
}

const styles = theme => ({
    postContainer: {
        marginTop: theme.spacing.unit * 4
    },
    posts: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        textAlign: "left"
    }
})

export default withStyles(styles)(Posts)