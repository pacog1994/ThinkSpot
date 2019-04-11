import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Post from './Post'

class Posts extends Component {  
    render() {
        const classes = this.props.classes 
        return (
            <div className={classes.postContainer}> 
               <h2>Posts [{this.props.posts.length}]</h2>
               {
                   this.props.posts.map((post, i) => {
                        return (
                            <Post spotId={this.props.spotId} post={post} id={i} key={i}/>
                        )
                   })
               }
            </div>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

const styles = theme => ({
    postContainer: {
        marginTop: theme.spacing.unit * 4
    }
})

export default withStyles(styles)(Posts)