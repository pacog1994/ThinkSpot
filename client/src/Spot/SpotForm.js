import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import { addSpot } from '../_actions'

import TextField from '@material-ui/core/TextField'
import FaFloppy0 from 'react-icons/lib/fa/floppy-o'


/**
 * Form component for creating a spot
 */
class SpotForm extends Component {  
    constructor (props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

   submit = (e) => {
        e.preventDefault();
        if (this.newTitle.value != null && 
            this.newDesc.value != null) {
            const user = this.props.user
             
            //process spot uid
            var uid = this.props.db_spots.length

             for(var i = 0; i < this.props.db_spots.length; i++) {
                 if(this.props.db_spots[i].id !== i) {
                    uid = i
                    break;
                 }
             }
             
            this.props.addSpot(uid,
                            user.username, 
                            this.newTitle.value,
                            this.newDesc.value)
           this.props.history.push('/spots') 
        }
    }

    render() {   
        const { prompt } = this.props
        
        return (
            <div style={{ marginTop: "10px", marginLeft: "10px", width: "60%" }}>
                <form className="addSpotForm" onSubmit={this.submit}>
                    <TextField
                        autoFocus={true}
                        id="title"
                        label="Title"
                        required
                        inputRef={input => (this.newTitle = input)}
                        type="text"
                    />
                    <br></br>
                    <TextField
                        fullWidth={true}
                        label="Description"
                        id="prompt"
                        inputRef={input => (this.newDesc = input)}
                        margin="dense"
                        multiline={true}
                        placeholder="Write a description for your spot"
                        required
                        rows={2}
                        rowsMax={4}
                        type="string"
                        
                    />
                    <br></br>
                    <button><FaFloppy0/>Create Spot</button>
                </form>
            </div>
         )
        
    }
}

SpotForm.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string,
    user: PropTypes.object.isRequired,
    spots: PropTypes.array.isRequired,
    db_spots: PropTypes.array.isRequired,
    addSpot: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        spots: state.spots,
        db_spots: state.db.spots
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addSpot: addSpot
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpotForm))