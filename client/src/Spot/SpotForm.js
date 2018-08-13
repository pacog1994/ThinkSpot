import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import FaFloppy0 from 'react-icons/lib/fa/floppy-o';
import { addSpot } from '../_actions'

/**
 * Form component for creating a spot
 */
class SpotForm extends Component {  
    
    constructor (props) {
        super(props);
        this.state = {
            submitted: false
        }   
        this.submit = this.submit.bind(this);
    }

   submit = (e) => {
        e.preventDefault();
        if (this.refs.title.value != null && 
            this.refs.desc.value != null) {
            const user = JSON.parse(localStorage.getItem('redux-store')).user
            const uid = Object.keys(JSON.parse(localStorage.getItem('redux-store')).spot).length  
            this.props.addSpot(uid,
                            user.username, 
                            this.refs.title.value,
                            this.refs.desc.value)
            this.setState({submitted: true})  
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
                
                {this.state.submitted ? <Redirect to="/spot"/> : null} 
            </div>
         )
        
    }
}

const mapStateToProps = (state) => {
    return {
        spot: state.spot
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addSpot: addSpot
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotForm)

SpotForm.propTypes = {
    title: PropTypes.string,
    prompt: PropTypes.string,
}
