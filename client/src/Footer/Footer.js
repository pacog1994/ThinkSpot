import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

//Container Component for different links - Log in/out, MySpot and home
class Footer extends Component {        
    render() {
        return (
            <div className={this.props.classes.root}></div>
        )
    }    
}

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        height: theme.spacing.unit * 30,
        backgroundColor: "#242729"
    }
})

export default withStyles(styles)(Footer)
