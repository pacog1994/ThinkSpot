import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
//Container Component for different links - Log in/out, MySpot and home
class Footer extends Component {        
    render() {
        return (
            <div className={this.props.classes.root}>
                <a className={this.props.classes.link} href="https://docs.google.com/document/d/1Hurhlo6DY5P8jRT6IgXGiQwE6zbqF8OPE3QgY1I7hMs/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> ThinkSpot Dev Notes</a>
            </div>
        )
    }    
}

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        height: theme.spacing.unit * 30,
        backgroundColor: "#242729"
    },
    link: {
        color: "white",
        textDecoration: 'none'
    }
})

export default withStyles(styles)(Footer)
