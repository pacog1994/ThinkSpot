import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { addSpot } from '../_actions'

import FaFloppy0 from 'react-icons/lib/fa/floppy-o';


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
        if (this.refs.title.value != null && 
            this.refs.desc.value != null) {
            const user = this.props.user
             
            //process spot uid
            var uid = this.props.db_spots.length

             for(var i = 0; i < this.props.db_spots.length; i++) {
                 console.log(uid)
                 if(this.props.db_spots[i].id !== i) {
                    uid = i
                    break;
                 }
             }
             console.log(uid)

            this.props.addSpot(uid,
                            user.username, 
                            this.refs.title.value,
                            this.refs.desc.value)
           this.props.history.push('/spots') 
        }
    }

    render() {   
        const { prompt } = this.props
        
        return (
            <div style={{ padding: "5px" }}>
                <form className="addSpotForm" onSubmit={this.submit}>
                    <label htmlFor="title">Title</label>
                    <br></br>
                    <input id="title" 
                        type="text"
                        required
                        ref="title"
                    />
                    <br></br>
                    <label htmlFor="prompt">Description</label>
                    <br></br>
                    <textarea id="prompt" 
                        type="text" 
                        defaultValue={prompt}
                        required
                        ref="desc"
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